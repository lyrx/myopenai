import fs from "fs";
import openai from "../openai/openai.mjs";
import common from "../util/common.mjs";


export default {

    chatCompletion:  async function () {

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "user", content: "Hello world"},
            ],
        });

        common.llog.mylogObject(completion.data.choices[0]);
        common.llog.mylogObject(completion.data.usage);
    }

};





