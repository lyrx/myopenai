import fs from 'fs/promises';
import path from 'path';
import {getCurrentDate_ddMMYYYY, getCurrentTime} from "../util/dates.mjs";
import common from "../util/common.mjs";
async function readFile(aFile) {
    try {
        // Check if the input file exists
        try {
            await fs.access(aFile);
        } catch (err) {
            common.llog.myerror(`Input file '${aFile}' does not exist.`);
            return;
        }
        return fs.readFile(aFile, 'utf8');
    } catch (err) {
        common.llog.myerror('Error:', err);
    }
}

async function prettyPrintJson(data, outputFile) {
    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Pretty-print the JSON data
        const prettyData = stringifyPretty(jsonData)

        // Write the pretty-printed JSON data to the output file
        await fs.writeFile(outputFile, prettyData, 'utf8');
        common.llog.mylog(`Beendet um ${getCurrentTime()} Uhr am ${getCurrentDate_ddMMYYYY()}`)

    } catch (err) {
        common.llog.myerror('Error:', err);
    }
}
function stringifyPretty(data){
    return JSON.stringify(data, null, 2);
}

async function prettyPrint(dirString, sourceFileName) {
    const targetFileName = `${path.parse(sourceFileName).name}-pretty${path.extname(sourceFileName)}`;
    const inputFile = path.join(dirString, sourceFileName);
    const outputFile = path.join(dirString, targetFileName.toString());

    common.llog.mylog(`${inputFile} -> ${outputFile}`)
    const data = await readFile(inputFile)
    prettyPrintJson(data, outputFile)

}


export {readFile, prettyPrintJson, prettyPrint,stringifyPretty};
