import common from "./util/common.mjs";
import prompts from "./json/prompts.mjs";
import openai from "./openai/openai.mjs";
import cv from "./cv/cv.mjs"


await cv.cvRequest("Wo hast du Erfahrungen im Projektmanagement?");


common.llog.mylogWithTime("Finished!")



