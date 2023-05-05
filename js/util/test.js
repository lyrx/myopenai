import  fs from "fs";
import docx  from 'docx';
import cv from '../cv/cv.mjs'
import {llog} from "./common.mjs";



// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
await cv.generateDocx();




// Done! A file called 'My Document.docx' will be in your file system.

llog.mylogWithTime("Finished!")



