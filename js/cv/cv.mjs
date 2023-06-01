import {readFile} from "../json/jsonutils.mjs";
import common from "../util/common.mjs";
import paths from "../util/paths.mjs";
import {monthsBetween, stringToDates} from "../util/dates.mjs";
import openai from "../openai/openai.mjs";
import cvdata from "../json/cvdata.js";
import cvdata_en from "../json/cvdata_en.js";
async function cvRequest(question) {
    const response = await openai.openai.createCompletion({
        model: "text-davinci-003",
        prompt: await cvprompt(question),
        temperature: 0,
        max_tokens: 600,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });


    common.llog.mylog(response.data.choices[0].text);


    common.llog.mylogObject(response.data.usage);
}
async function readCV_object() {

    cvdata.projects = function () {
        return cvdata["work_experience"]
    };

    return cvdata;
}
async function readCV_objectEnglish() {
    return cvdata_en;
}
function filterbySkill(workExperienceList, skill,skillset) {
    return workExperienceList.filter(
        function (we) {
            return common.isSubstringIgnoreCase(we[skillset], skill);
        }
    )
}
function totalSkillMonths(workExperienceList) {

    return workExperienceList.reduce(function (accumulator, we) {

        return accumulator + we["monthsDuration"];
    }, 0);

}
function allSkills(workExperienceList,skillSet) {
    const allSkillsString = workExperienceList.reduce(function (accumulator, we) {
        return `${we[skillSet]},${accumulator}`;
    }, "");

    const asList = allSkillsString.split(",").map((s) => s.trim()).filter((s) => {
        return (s.length > 1);
    });


   return [...new Set(asList)];

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
        we.monthsDuration = monthsBetween(fromDate, toDate);
        return we;
    })
}
function genVita(aPimped,isEnglish){
    return  aPimped.reduce(function (acc, c) {
        return `${acc}
${c["index"]}.) ${c["date"]}: ${c["position"]} ${isEnglish ? "at" : "bei"} "${c["company"]}": ${c["responsibilities"][0]}`

    }, "");
}
async function skillString(isEnglish){
    return internalSkillString(isEnglish,"technologies");
}
async function softSkillString(isEnglish){
    return internalSkillString(isEnglish,"softskills");
}
async function internalSkillString(isEnglish,skillSet){
    const {pimpedAllPositions,allSkillsList} =
        await skillsAndExperience(isEnglish,skillSet);

    return allSkillsList.reduce(function (acc, c) {
            const filteredBySkill = filterbySkill(pimpedAllPositions, c,skillSet)

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
                const filteredBySkill = filterbySkill(aAllPositions, c,skillset)
                const ids = filteredBySkill.reduce(function (acc, c) {
                    return `${c["index"]},${acc}`;
                }, "");
                return `${acc}\n${c}: ${totalSkillMonthsAndYears(filteredBySkill,isEnglish)} (${ids})`
            }
            , "");
    }

    const knowHow = findKnowHow("technologies",allSkillsList,pimpedAllPositions);
    const softKnowhow = findKnowHow("softskills",softSkillsAndSchmodder.allSkillsList,softSkillsAndSchmodder.pimpedAllPositions);

    const vitaAlsSelbstaendiger = genVita(pimpedAlsSelbstaendiger,isEnglish)
    const vitaAlsAngestellter = genVita(pimpedAlsAngestellter,isEnglish)

    return `    
${isEnglish ? `Your name  is Alexander Weinmann. You work as  IT Consultant. You are born on
1965/20/10. You are 57 years old.

As freelance consultant:` : `Dein Name ist Alexander Weinmann. Du bist IT-Consultant. Du bist am
20.10.1965 geboren und 57 Jahre alt.

Als freiberuflicher IT-Consultant:`}
${vitaAlsSelbstaendiger}

${isEnglish ? `Permanent positions:` : `Als fest angestellter IT-Consultant:`}
${vitaAlsAngestellter}


${isEnglish ? "Your Technical Know How:" :  "Dein technisches Know How:" }
${knowHow}

${isEnglish ? "Your Skills:" :  "Deine Skills:" }
${softKnowhow}

${question}
`

}
export default {
    cvprompt,
    cvRequest,
    skillString,
    softSkillString,
    readCV_object,
    readCV_objectEnglish
};


