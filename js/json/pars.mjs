import path from 'path';
import {readFile} from "./jsonutils.mjs";
import {mylog} from "../util/common.mjs";

async function parseFile(dirString, sourceFileName) {
    const inputFile = path.join(dirString, sourceFileName);

    const data = await readFile(inputFile)
    const pars = splitText(data)
    return pars

}

function splitText(text){
    return text.split(/\n\s*\n/);
}

export {parseFile, splitText}
