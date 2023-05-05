import {readFile} from "../json/jsonutils.mjs";
import {isSubstringIgnoreCase, mylog, mylogObject} from "../util/common.mjs";
import {project_home} from "../util/paths.mjs";
import {monthsBetween, stringToDates} from "../util/dates.mjs";
import fs from "fs";
import docx from 'docx';


function generateDocx() {
    docx.Packer.toBuffer(asDocx()).then((buffer) => {
        fs.writeFileSync("cv.docx", buffer);
    });
}


function asDocx() {
    return new docx.Document({
        sections: [
            {
                properties: {},
                children: [
                    new docx.Paragraph({
                        text: "Alexander Weinmann",
                        heading: docx.HeadingLevel.HEADING_1,

                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun("\n"),
                        ],
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun("Hello World"),
                            new docx.TextRun({
                                text: "Foo Bar",
                                bold: true,
                            }),
                            new docx.TextRun({
                                text: "\tGithub is the best",
                                bold: true,
                            }),
                        ],
                    }),


                ],
            },
        ],
    });
}

async function readCV() {
    return readFile(`${project_home}/js/json/cv.json`)
}

async function readCV_object() {
    return JSON.parse(await readCV())
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
    cvprompt, asDocx,generateDocx
};


