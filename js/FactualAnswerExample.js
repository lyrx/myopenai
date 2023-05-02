import { prompts } from "./openai/prompts.mjs";
import {  openai } from "./openai/openai.mjs";
import {mylog} from "./util/common.mjs";

//const response = await openai.listEngines();



const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompts.factualAnsweringSample,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
});



mylog(response.data.choices[0].text)
