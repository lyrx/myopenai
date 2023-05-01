import fs from 'fs/promises';
import path from 'path';
import {  parseJSONFile } from "./jsonutils.mjs";


const downloads = "/Users/alex/Downloads/openaiexport"

// Replace 'input.json' with the path to your JSON file
const inputFile = path.join(downloads, 'conversations.json');


parseJSONFile(inputFile)


