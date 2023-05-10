import {readFile} from "../json/jsonutils.mjs";
import common from "../util/common.mjs";
import {project_home} from "../util/paths.mjs";
import {monthsBetween, stringToDates} from "../util/dates.mjs";
import fs from "fs";
import docx from 'docx';


async function generateDocx() {
    await generateDocxAndWriteFileInternal(await asDocx(),"cv.docx");
    await generateDocxAndWriteFileInternal(await asDocxEnglish(),"cv-en.docx");
}



async function generateDocxAndWriteFileInternal(doc, fileNameToWrite) {
    docx.Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(fileNameToWrite, buffer);
    });
}



async function asDocx() {
   return asDocxInternal(await readCV_object(),false)
}

async function asDocxEnglish() {
    return asDocxInternal(await readCV_objectEnglish(),true)
}
async function asDocxInternal(cv,isEnglish) {

    const wl = cv.projects();

    function newLine() {
        return new docx.Paragraph({
            children: [
                new docx.TextRun("\n"),
            ],
        });
    }

    function workDescription(we) {
        return [
            new docx.Paragraph({
                text: `${we["company"]}: ${we["position"]} (${we["date"]})`,
                heading: docx.HeadingLevel.HEADING_2,
            }),
            newLine(),
            new docx.Paragraph({
                text: we["responsibilities"][1],
                bullet: {
                    level: 0
                },
            }),
            new docx.Paragraph({
                text: we["responsibilities"][0],
                bullet: {
                    level: 0
                },
            }),
            newLine(),
        ];
    }

    return new docx.Document({
        sections: [
            {
                properties: {},
                children: wl.reduce(function (accumulator, we) {
                        return accumulator.concat(workDescription(we));
                    },
                    []).concat([
                    new docx.Paragraph({
                        text: isEnglish ? "Skill Set" : "Skills",
                        heading: docx.HeadingLevel.HEADING_1,
                    }),
                    new docx.Paragraph({
                        text: `${await softSkillString(isEnglish)}`,

                    }),
                    new docx.Paragraph({
                        text: isEnglish ? `Technical Skills` : "Technische Skills",
                        heading: docx.HeadingLevel.HEADING_1,
                    }),
                    new docx.Paragraph({
                        text: `${await skillString(isEnglish)}`,

                    }),

                ]),
            },
        ],
    });
}


async function readCV() {
    return readCVByFile(`${project_home}/js/json/cv.json`)
}

async function readCVEnglish() {
    return readCVByFile(`${project_home}/js/json/cv-en.json`)
}

async function readCVByFile(fileName) {
    return readFile(fileName)
}


async function readCV_object() {
    return readCV_objectInternal(await readCV());
}
async function readCV_objectEnglish() {
    return readCV_objectInternal(await readCVEnglish());
}


async function readCV_objectInternal(p) {
    const o = JSON.parse(p);
    o.projects = function () {
        return o["work_experience"]
    };
    return o;
}



function filterbySkill(workExperienceList, skill,skillset) {
    return workExperienceList.filter(
        function (we) {
            let subString = skill;
            return common.isSubstringIgnoreCase(we[skillset], subString);
        }
    )
}


function totalSkillMonths(workExperienceList) {

    const sum = workExperienceList.reduce(function (accumulator, we) {

        return accumulator + we["monthsDuration"];
    }, 0);
    return sum;
}

function allSkills(workExperienceList,skillSet) {
    const allSkillsString = workExperienceList.reduce(function (accumulator, we) {
        return `${we[skillSet]},${accumulator}`;
    }, "");

    const asList = allSkillsString.split(",").map((s) => s.trim()).filter((s) => {
        return (s.length > 1);
    });


    const uniqueList = [...new Set(asList)];
    return uniqueList
}


function totalSkillMonthsAndYears(workExperienceList,isEnglish) {
    let sum = totalSkillMonths(workExperienceList);
    let years = Math.floor(sum / 12);
    let months = sum % 12
    return years > 0 ? `${years} ${isEnglish ? 'years' : 'Jahre' }, ${months}  ${isEnglish ? 'months' : 'Monate' }` : `${sum} ${isEnglish ? 'months' : 'Monate' }`
}


function pimpWorkExperience(workExperience,offset) {
    return workExperience.map(function (we, index) {
        we.index = index + 1 + (typeof offset !== 'undefined' ? offset : 0);
        const [fromDate, toDate] = stringToDates(we["date"]);
        we.fromDate = fromDate;
        we.toDate = toDate;
        const months = monthsBetween(fromDate, toDate);
        we.monthsDuration = months;
        return we;
    })
}

function genVita(aPimped){
    return  aPimped.reduce(function (acc, c) {
        return `${acc}
${c["index"]}.) ${c["date"]}: ${c["position"]} bei "${c["company"]}": ${c["responsibilities"][0]}`

    }, "");
}

async function skillString(isEnglish){
    return internalSkillString(isEnglish,"technologies");
}

async function softSkillString(isEnglish){
    return internalSkillString(isEnglish,"softskills");
}


async function internalSkillString(isEnglish,skillSet){
    const {pimpedAlsSelbstaendiger,pimpedAlsAngestellter,pimpedAllPositions,allSkillsList} =
        await skillsAndExperience(isEnglish,skillSet);

    return allSkillsList.reduce(function (acc, c) {
            const skill = c;
            const filteredBySkill = filterbySkill(pimpedAllPositions, skill,skillSet)

            return `${acc}${c} (${totalSkillMonthsAndYears(filteredBySkill,isEnglish)}),`
        }
        , "")
}




async function skillsAndExperience(isEnglish,skillSet){
    const aCVObject = await ( isEnglish ? ( readCV_objectEnglish()): ( readCV_object()));
    const alsSelbstaendiger = aCVObject["work_experience"];
    const alsAngestellter = aCVObject["festanstellung"];


    const pimpedAlsSelbstaendiger = pimpWorkExperience(alsSelbstaendiger,0);
    const pimpedAlsAngestellter = pimpWorkExperience(alsAngestellter,pimpedAlsSelbstaendiger.length);

    const pimpedAllPositions = pimpedAlsSelbstaendiger.concat(pimpedAlsAngestellter);
    const allSkillsList = allSkills(pimpedAllPositions,skillSet);
    return {
        pimpedAlsSelbstaendiger,pimpedAlsAngestellter,pimpedAllPositions,allSkillsList
    };
}



async function cvprompt(question,isEnglish) {
    const {pimpedAlsSelbstaendiger,pimpedAlsAngestellter,pimpedAllPositions,allSkillsList} =
       await  skillsAndExperience(isEnglish,"technologies");

    const softSkillsAndSchmodder =
        await  skillsAndExperience(isEnglish,"softskills");



    function findKnowHow (skillset,aSkillList,aAllPositions)  {
        return aSkillList.reduce(function (acc, c) {
                const skill = c;
                const filteredBySkill = filterbySkill(aAllPositions, skill,skillset)
                const ids = filteredBySkill.reduce(function (acc, c) {
                    return `${c["index"]},${acc}`;
                }, "");
                return `${acc}\n${c}: ${totalSkillMonthsAndYears(filteredBySkill)} (${ids})`
            }
            , "");
    }

    const knowHow = findKnowHow("technologies",allSkillsList,pimpedAllPositions);
    const softKnowhow = findKnowHow("softskills",softSkillsAndSchmodder.allSkillsList,softSkillsAndSchmodder.pimpedAllPositions);

    const vitaAlsSelbstaendiger = genVita(pimpedAlsSelbstaendiger)
    const vitaAlsAngestellter = genVita(pimpedAlsAngestellter)

    return `
Dein Name ist Alexander Weinmann. Du bist IT-Consultant. Du bist am
20.10.1965 geboren und 57 Jahre alt.

Als freiberuflicher IT-Consultant:
${vitaAlsSelbstaendiger}

Als fest angestellter IT-Consultant:
${vitaAlsAngestellter}


Deine technisches KnowHow:
${knowHow}

Deine Skills:

${softKnowhow}


Beantworte alle weiteren Fragen in der Ich-Form, als kämen sie von einem Recruiter.

${question}
`

}


export default {
    cvprompt, asDocx, generateDocx,skillString,softSkillString
};


