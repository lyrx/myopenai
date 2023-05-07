import cv from '../cv/cv.mjs'
import common from "./common.mjs";
import openai from "../openai/openai.mjs";



await cv.generateDocx();



// Done! A file called 'My Document.docx' will be in your file system.

common.llog.mylogWithTime("Finished!")



