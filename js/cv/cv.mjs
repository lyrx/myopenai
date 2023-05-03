import {readFile} from "../json/jsonutils.mjs";
import {mylog} from "../util/common.mjs";
import {project_home} from "../util/paths.mjs";


async function readCV() {
    return  readFile(`${project_home}/js/json/cv.json`)
}

async function readCV_object() {
    return   JSON.parse(await readCV())
}



async function cvprompt(question) {

    return `Du bist IT-Consultant und das ist dein Lebenslauf im JSON-Format:
    
${await readCV()}

Du arbeitest seit 1999 mit Java. 

Beantworte alle weiteren Fragen in der Ich-Form, als kämen sie von einem Recruiter.

${question}
`

}


async function output_cvprompt(question) {

    mylog(await cvprompt(question));


}


export {readCV,readCV_object,cvprompt,output_cvprompt};

