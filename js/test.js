import common from "./util/common.mjs";
import openai from "./openai/openai.mjs";


common.llog.mylogObject(
    await openai.fetchChatCompletion({
            "OPENAI_API_KEY": process.env.OPENAI_API_KEY
        },
        [{"role": "user", "content": "Hello!"}]));

common.llog.mylogWithTime("Finished!")



