import common from "./common.mjs";
import prompts from "../json/prompts.mjs";
import openai from "../openai/openai.mjs";
import cv from "../cv/cv.mjs"



common.llog.mylog(await cv.skillString(true));

//common.llog.mylog(await cv.cvprompt("sdffsd"));



// Done! A file called 'My Document.docx' will be in your file system.

common.llog.mylogWithTime("Finished!")



