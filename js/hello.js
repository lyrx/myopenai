import { Configuration, OpenAIApi } from "openai";
import { prompts } from "./prompts.mjs";

const configuration = new Configuration({
    organization: "org-iX3AplRFfPst8hdpXcv7gfv2",
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);
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
