import {getCurrentTime} from "./dates.mjs";

function zipWithIndex(array) {
    return array.map((element, index) => [element, index]);
}


function mylog(s) {
    console.log(`${s}`);
}

function myerror(s) {
    console.error(`${s}`);
}

function mylogObject(o) {
    console.error(JSON.stringify(o,null,2));
}


function isSubstringIgnoreCase(mainString, subString) {
    const lowerMainString = mainString.toLowerCase();
    const lowerSubString = subString.toLowerCase();

    return lowerMainString.includes(lowerSubString);
}


function mylogWithTime(s) {
    console.log(`${getCurrentTime()}: ${s}`);
}

function myerrorWithTime(s) {
    console.error(`${getCurrentTime()}:${s}`);
}

const llog = {mylog, mylogObject,mylogWithTime,myerrorWithTime}

export {
    llog,
    zipWithIndex,
    isSubstringIgnoreCase
};
