import {readFile} from "../json/jsonutils.mjs";
import {mylog} from "../util/common.mjs";

const prompts = {

    "factualAnsweringSample": `
Q: Who is Batman?
A: Batman is a fictional comic book character.

Q: What is torsalplexity?
A: ?

Q: What is Devz9?
A: ?

Q: Who is George Lucas?
A: George Lucas is American film director and producer famous for creating Star Wars.

Q: What is the capital of California?
A: Sacramento.

Q: What orbits the Earth?
A: The Moon.

Q: Who is Fred Rickerson?
A: ?

Q: What is an atom?
A: An atom is a tiny particle that makes up everything.

Q: Who is Alvan Muntz?
A: ?

Q: What is Kozar-09?
A: ?

Q: How many moons does Mars have?
A: Two, Phobos and Deimos.

Q: What's a language model?
A:
    `
}

async function readCV() {
    return  readFile("json/shortcv.json")
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


export {prompts,readCV,cvprompt,output_cvprompt};

