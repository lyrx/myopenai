import  fs from "fs";
import docx  from 'docx';
import cv from '../cv/cv.mjs'
import {mylogWithTime} from "./common.mjs";



// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
const doc = cv.generateDocx();



// Done! A file called 'My Document.docx' will be in your file system.

mylogWithTime("Finished!")



//const javaProjects = filterbySkill(pimped,"Java")
//mylogObject(allSkills(pimped));
//mylogObject(javaProjects);
//mylog(`Total Java-Skills: ${totalSkillMonths(javaProjects)}`)
//mylogObject(totalSkillMonthsAndYears(javaProjects))
