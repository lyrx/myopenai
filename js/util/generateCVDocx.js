import cv from '../cv/cv.mjs'
import common from "./common.mjs";
import openai from "../openai/openai.mjs";



await cv.generateDocx();


common.llog.mylogWithTime("Finished!")



