import {readFile} from "../json/jsonutils.mjs";
import {isSubstringIgnoreCase, mylog, mylogObject} from "../util/common.mjs";
import {project_home} from "../util/paths.mjs";
import {monthsBetween, stringToDates} from "../util/dates.mjs";


async function readCV() {
    return readFile(`${project_home}/js/json/cv.json`)
}

async function readCV_object() {
    return JSON.parse(await readCV())
}

function filterbySkill(workExperienceList, skill) {
    return workExperienceList.filter(
        function (we) {
            let mainString = we["technologies"];
            let subString = skill;
            return isSubstringIgnoreCase(mainString, skill);
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
    const allSkills = workExperienceList.reduce(function (accumulator, we) {
        return accumulator.concat(we["technologies"]);
    }, []);

    const uniqueSet = new Set(allSkills);
    const allSkillsUnique = Array.from(uniqueSet);
    return allSkillsUnique;
}


function totalSkillMonthsAndYears(workExperienceList) {
    let sum = totalSkillMonths(workExperienceList);
    let years = Math.floor(sum / 12);
    let months = sum % 12
    return years > 0 ? `${years} Jahre, ${months} Monate` : `${months} Monate`
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

  const vita =   pimped.reduce(function(acc, c) {
        return `${acc}
${c["index"]}.) ${c["date"]}: ${c["position"]} bei "${c["company"]}": ${c["responsibilities"][0]}`

    }, "");


    return `
Dein Name ist Alexander Weinmann. Du bist IT-Consultant. Du bist am
20.10.1965 geboren und 57 Jahre alt. Dies ist dein Lebenslauf:
${vita}

Beantworte alle weiteren Fragen in der Ich-Form, als kämen sie von einem Recruiter.

${question}
`

}



export {
    cvprompt
};


