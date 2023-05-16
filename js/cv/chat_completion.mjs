
import openai from "../openai/openai.mjs";

import cv from "../cv/cv.mjs"
import common from "../util/common.mjs";

export default {

    cvCompletion:  async function () {

        const mymsg = [
            {role: "system", content: `${await cv.cvprompt("",false)}`},
            {role: "user", content: "Welche Erfahrungen hast Du mit Java?"},
        ];
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: mymsg,
        });
        return completion
    }

};





