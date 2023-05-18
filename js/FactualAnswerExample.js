import   openai  from "./openai/openai.mjs";
import {mylog} from "./util/common.mjs";

const factualAnsweringSample = {

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


const response = await openai.openai.createCompletion({
    model: "text-davinci-003",
    prompt: factualAnsweringSample,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
});



mylog(response.data.choices[0].text)
