import fs from "fs";
import docx from 'docx';
import cvmodule from "./cv.mjs"


async function generateDocx() {
    await generateDocxAndWriteFileInternal(await asDocx(),"cv.docx");
    await generateDocxAndWriteFileInternal(await asDocxEnglish(),"cv-en.docx");
}



async function generateDocxAndWriteFileInternal(doc, fileNameToWrite) {
    docx.Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(fileNameToWrite, buffer);
    });
}



async function asDocx() {
   return asDocxInternal(await cvmodule.readCV_object(),false)
}

async function asDocxEnglish() {
    return asDocxInternal(await cvmodule.readCV_objectEnglish(),true)
}
async function asDocxInternal(cv,isEnglish) {

    const wl = cv.projects();

    function newLine() {
        return new docx.Paragraph({
            children: [
                new docx.TextRun("\n"),
            ],
        });
    }

    function workDescription(we) {
        return [
            new docx.Paragraph({
                text: `${we["company"]}: ${we["position"]} (${we["date"]})`,
                heading: docx.HeadingLevel.HEADING_3,
            }),
            new docx.Paragraph({
                text: we["responsibilities"][1],
                bullet: {
                    level: 0
                },
            }),
            new docx.Paragraph({
                text: we["responsibilities"][0],
                bullet: {
                    level: 0
                },
            }),
            newLine(),
        ];
    }

    return new docx.Document({
        sections: [
            {
                properties: {},
                children: wl.reduce(function (accumulator, we) {
                        return accumulator.concat(workDescription(we));
                    },
                    []).concat([
                    new docx.Paragraph({
                        text: isEnglish ? "Skill Set" : "Skills",
                        heading: docx.HeadingLevel.HEADING_1,
                    }),
                    new docx.Paragraph( {
                        text: `${await cvmodule.softSkillString(isEnglish)}`,

                    }),
                    new docx.Paragraph({
                        text: isEnglish ? `Technical Skills` : "Technische Skills",
                        heading: docx.HeadingLevel.HEADING_1,
                    }),
                    new docx.Paragraph({
                        text: `${await cvmodule.skillString(isEnglish)}`,

                    }),

                ]),
            },
        ],
    });
}






export default {
      generateDocx,
};


