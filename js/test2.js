import  fs from "fs";
import docx  from 'docx';
import cv from "./cv/cv.mjs"
import common from "./util/common.mjs";
import openai from "./openai/openai.mjs";


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



common.llog.mylogWithTime("Finished")

