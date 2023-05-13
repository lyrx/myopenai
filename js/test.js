import common from "./util/common.mjs";
import cv from "./cv/cv.mjs"
import chat from "./cv/chat_completion.mjs"

const response = await chat.chatCompletion();

cmmon.llog.mylogObject(response.data)
common.llog.mylogWithTime("Finished!")



