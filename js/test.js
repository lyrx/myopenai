import common from "./util/common.mjs";
import cv from "./cv/cv.mjs"
import chat from "./cv/chat_completion.mjs"
import completeprompt from "./prompts/completeprompt.mjs";


const completion = await completeprompt.completePrompt("james", "Birds are not real.");

common.llog.mylogObject(completion.data);



common.llog.mylogWithTime("Finished!")



