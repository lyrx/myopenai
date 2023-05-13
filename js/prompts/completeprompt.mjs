import {readFile} from "../json/jsonutils.mjs";
import paths from "../util/paths.mjs"
import openai from "../openai/openai.mjs";


export default {
    readPrompt: async function (name) {
        return readFile(`${paths.project_home}/js/prompts/${name}.txt`)
    },

    completePrompt: async function (promptName, question) {
        const p = await this.readPrompt(promptName);
        const completePrompt = `${p}
${question}`

        return openai.createCompletion({
            model: "text-davinci-003",
            prompt: completePrompt,
            temperature: 0,
            max_tokens: 600,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

    }

}
