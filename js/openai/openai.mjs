import {Configuration, OpenAIApi} from "openai";
import cv from "../cv/cv.mjs";
import common from "../util/common.mjs";


const configuration = new Configuration({
    organization: "org-iX3AplRFfPst8hdpXcv7gfv2",
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


async function cvRequest(question) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: await cv.cvprompt(question),
        temperature: 0,
        max_tokens: 600,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });


    common.llog.mylogObject(response);


    common.llog.mylogObject(response.data.usage);
}


async function helloWorldChatCompletion() {

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "user", content: "Hello world"},
        ],
    });

    common.llog.mylogObject(completion.data.choices[0]);
    common.llog.mylogObject(completion.data.usage);
}


export default {cvRequest, helloWorldChatCompletion};
