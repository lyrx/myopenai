import {mylog, mylogObject, mylogWithTime} from "./common.mjs";

import {
     cvprompt
} from "../cv/cv.mjs";




mylog(await cvprompt("Was hast du 2013 gemacht?"))

mylogWithTime("Finished!")



//const javaProjects = filterbySkill(pimped,"Java")
//mylogObject(allSkills(pimped));
//mylogObject(javaProjects);
//mylog(`Total Java-Skills: ${totalSkillMonths(javaProjects)}`)
//mylogObject(totalSkillMonthsAndYears(javaProjects))
