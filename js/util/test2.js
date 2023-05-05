import  fs from "fs";
import docx  from 'docx';




// Documents contain sections, you can have multiple sections per document, go here to learn more about sections
// This simple example will only contain one section
const doc = new docx.Document({
    sections: [
        {
            properties: {},
            children: [
                new docx.Paragraph({
                    text: "Alexander Weinmann",
                    heading: docx.HeadingLevel.HEADING_1,

                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun("\n"),
                    ],
                }),
                new docx.Paragraph({
                    children: [
                        new docx.TextRun("Hello World"),
                        new docx.TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new docx.TextRun({
                            text: "\tGithub is the best",
                            bold: true,
                        }),
                    ],
                }),




            ],
        },
    ],
});

// Used to export the file into a .docx file
docx.Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});

// Done! A file called 'My Document.docx' will be in your file system.
