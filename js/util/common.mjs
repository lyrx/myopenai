import {getCurrentTime} from "./dates.mjs";

function zipWithIndex(array) {
    return array.map((element, index) => [element, index]);
}


function mylog(s) {
    console.log(`${getCurrentTime()}: ${s}`);
}

function myerror(s) {
    console.error(`${getCurrentTime()}: ${s}`);
}


export {
    mylog,
    myerror,
    zipWithIndex
};
