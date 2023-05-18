import {Configuration, OpenAIApi} from "openai";


const configuration = new Configuration({
    organization: "org-iX3AplRFfPst8hdpXcv7gfv2",
    apiKey: process.env.OPENAI_API_KEY
});


export default {
    openai: new OpenAIApi(configuration),
    fetchChatCompletion: async function (env,messages) {
        const openaiUrl = "https://api.openai.com/v1/chat/completions";


        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`
        };

        const body = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": messages
        });

        const response = await fetch(openaiUrl, {
            method: 'POST',
            headers,
            body
        });

        return await response.json();

    }
}
