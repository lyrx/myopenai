import {Configuration, OpenAIApi} from "openai";
import {cvprompt} from "../cv/cv.mjs";
import {mylog, mylogObject} from "../util/common.mjs";


const configuration = new Configuration({
    organization: "org-iX3AplRFfPst8hdpXcv7gfv2",
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


async function cvRequest(question){
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: await cvprompt(question),
        temperature: 0,
        max_tokens: 600,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    mylog(`Q: ${question}
A:${response.data.choices[0].text}

${JSON.stringify(response.data.usage,null,2)}`);

}

export { openai,cvRequest };
