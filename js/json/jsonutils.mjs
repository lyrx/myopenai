import fs from 'fs/promises';
import path from 'path';
import {getCurrentDate_ddMMYYYY, getCurrentTime, myerror, mylog} from "../util/common.mjs";

async function readFile(aFile) {
    try {
        // Check if the input file exists
        try {
            await fs.access(aFile);
        } catch (err) {
            myerror(`Input file '${aFile}' does not exist.`);
            return;
        }

        // Read the input JSON file
        const data = await fs.readFile(aFile, 'utf8');
        return data;
    } catch (err) {
        myerror('Error:', err);
    }
}

async function prettyPrintJson(data, outputFile) {
    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Pretty-print the JSON data
        const prettyData = JSON.stringify(jsonData, null, 2);

        // Write the pretty-printed JSON data to the output file
        await fs.writeFile(outputFile, prettyData, 'utf8');
        mylog(`Beendet um ${getCurrentTime()} Uhr am ${getCurrentDate_ddMMYYYY()}`)

    } catch (err) {
        myerror('Error:', err);
    }
}

async function prettyPrint(dirString, sourceFileName) {
    const targetFileName = `${path.parse(sourceFileName).name}-pretty${path.extname(sourceFileName)}`;
    const inputFile = path.join(dirString, sourceFileName);
    const outputFile = path.join(dirString, targetFileName.toString());

    mylog(`${inputFile} -> ${outputFile}`)
    const data = await readFile(inputFile)
    prettyPrintJson(data, outputFile)

}


export {readFile, prettyPrintJson, prettyPrint};
