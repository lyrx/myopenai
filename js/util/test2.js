import  fs from "fs";
import docx  from 'docx';
import cv from "../cv/cv.mjs"
import common from "./common.mjs";


const deutsch = `
Projektmanagement, Testmanagement, Prozessoptimierung, Teamwork und Zusammenarbeit,
Change Management, Technische Analysen, Softwareentwicklung, DevOps, IT-Beratung EDV Beratung,
Softwarearchitektur, Anwendungsmanagement, Datenbanken
`.split(",").map((s) => s.trim()).filter((s) => {
    return (s.length > 1);
});

const englisch = `

Project Management, Test Management, Process Improvement, Teamwork and Collaboration,
Change Management, Technical Analysis, Software Development, DevOps, 
IT-Consulting Technical Consulting,Software Architecture,Application Management,Databases

`.split(",").map((s) => s.trim()).filter((s) => {
    return (s.length > 1);
});

common.llog.mylogObject(englisch);

common.llog.mylogWithTime("Finished")


// Done! A file called 'My Document.docx' will be in your file system.
