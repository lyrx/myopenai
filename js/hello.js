import { prompts } from "./prompts.mjs";
import {  openai } from "./openai.mjs";

//const response = await openai.listEngines();




const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompts.p1,
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
});

console.log(response.data)
