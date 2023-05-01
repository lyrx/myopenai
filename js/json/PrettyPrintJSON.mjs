import path from 'path';
import {parseJSONFile, prettyPrintJson,prettyPrint} from "./jsonutils.mjs";
import {  getCurrentTime, getCurrentDate_ddMMYYYY } from "../util/common.mjs";

const downloads = "/Users/alex/Downloads/openaiexport"

// Replace 'input.json' with the path to your JSON file



prettyPrint(downloads, 'conversations.json')


console.log(`Beendet um ${getCurrentTime()} Uhr am ${getCurrentDate_ddMMYYYY()}`)

