
import cv from '../cv/cv.mjs'
import common from "./common.mjs";
import openai from "../openai/openai.mjs";


// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
await openai.cvRequest("Welche Erfahrungen hast Du mit Java?");




// Done! A file called 'My Document.docx' will be in your file system.

common.llog.mylogWithTime("Finished!")



