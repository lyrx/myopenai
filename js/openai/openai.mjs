import {Configuration, OpenAIApi} from "openai";


const configuration = new Configuration({
    organization: "org-iX3AplRFfPst8hdpXcv7gfv2",
    apiKey: process.env.OPENAI_API_KEY
});



export default  {
     openai: new OpenAIApi(configuration),
    createResponse:   async function (request, env, ctx) {
        const openaiUrl = "https://api.openai.com/v1/engines/text-davinci-003/completions";
        const prompt = "Translate the following English text to French: \"Hello, world!\"";
        const maxTokens = 60;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`
        };

        const body = JSON.stringify({
            prompt,
            max_tokens: maxTokens
        });

        const response = await fetch(openaiUrl, {
            method: 'POST',
            headers,
            body
        });

        return await response.json();

    }
}
