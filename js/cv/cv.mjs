import {readFile} from "../json/jsonutils.mjs";
import {isSubstringIgnoreCase, llog} from "../util/common.mjs";
import {project_home} from "../util/paths.mjs";
import {monthsBetween, stringToDates} from "../util/dates.mjs";
import fs from "fs";
import docx from 'docx';


async function generateDocx() {
    docx.Packer.toBuffer(await asDocx()).then((buffer) => {
        fs.writeFileSync("cv.docx", buffer);
    });
}


async function asDocx() {
    const cv = await readCV_object();
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
                text: `${we["date"]}`,
                heading: docx.HeadingLevel.HEADING_2,
            }),
            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: we["position"],
                        italics: true
                    }),
                    new docx.TextRun(`: ${we["company"]}`),
                ],
            }),
            new docx.Paragraph({
                text: we["responsibilities"][0],
                bullet: {
                    level: 0
                },
            }),

            new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: we["technologies"],
                        italics: true
                    }),
                ],
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
                    []),
            },
        ],
    });
}

async function readCV() {

    return readFile(`${project_home}/js/json/cv.json`)
}

async function readCV_object() {
    const p = await readCV();

    const o = JSON.parse(p);
    o.projects = function () {
        return o["work_experience"]
    };
    return o;
}

function filterbySkill(workExperienceList, skill) {
    return workExperienceList.filter(
        function (we) {
            let subString = skill;
            return isSubstringIgnoreCase(we["technologies"], subString);
        }
    )
}


function totalSkillMonths(workExperienceList) {

    const sum = workExperienceList.reduce(function (accumulator, we) {

        return accumulator + we["monthsDuration"];
    }, 0);
    return sum;
}

function allSkills(workExperienceList) {
    const allSkillsString = workExperienceList.reduce(function (accumulator, we) {
        return `${we["technologies"]},${accumulator}`;
    }, "");

    const asList = allSkillsString.split(",").map((s) => s.trim()).filter((s) => {
        return (s.length > 1);
    });


    const uniqueList = [...new Set(asList)];
    return uniqueList
}


function totalSkillMonthsAndYears(workExperienceList) {
    let sum = totalSkillMonths(workExperienceList);
    let years = Math.floor(sum / 12);
    let months = sum % 12
    return years > 0 ? `${years} Jahre, ${months} Monate` : `${sum} Monate`
}


function pimpWorkExperience(workExperience) {
    return workExperience.map(function (we, index) {
        we.index = index + 1;
        const [fromDate, toDate] = stringToDates(we["date"]);
        we.fromDate = fromDate;
        we.toDate = toDate;
        const months = monthsBetween(fromDate, toDate);
        we.monthsDuration = months;
        return we;
    })
}


async function cvprompt(question) {
    const we = (await readCV_object())["work_experience"]
    const pimped = pimpWorkExperience(we)
    const all = allSkills(we);
    const knowHow = all.reduce(function (acc, c) {
            const skill = c;
            const filteredBySkill = filterbySkill(pimped, skill)
            const ids = filteredBySkill.reduce(function (acc, c) {
                return `${c["index"]},${acc}`;
            }, "");
            //  mylogObject(filteredBySkill);)
            return `${acc}\n${c}: ${totalSkillMonthsAndYears(filteredBySkill)} (${ids})`
        }
        , "")

    const vita = pimped.reduce(function (acc, c) {
        return `${acc}
${c["index"]}.) ${c["date"]}: ${c["position"]} bei "${c["company"]}": ${c["responsibilities"][0]}`

    }, "");


    return `
Dein Name ist Alexander Weinmann. Du bist IT-Consultant. Du bist am
20.10.1965 geboren und 57 Jahre alt. Dies ist dein Lebenslauf:
${vita}

Dein Know-How:
${knowHow}


Beantworte alle weiteren Fragen in der Ich-Form, als kämen sie von einem Recruiter.

${question}
`

}


export default {
    cvprompt, asDocx, generateDocx
};


