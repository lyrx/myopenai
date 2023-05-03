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



function mylogWithTime(s) {
    console.log(`${getCurrentTime()}: ${s}`);
}

function myerrorWithTime(s) {
    console.error(`${getCurrentTime()}:${s}`);
}



export {
    mylog,
    myerror,
    mylogObject,
    mylogWithTime,
    myerrorWithTime,
    zipWithIndex
};
