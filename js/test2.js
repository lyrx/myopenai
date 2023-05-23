import  fs from "fs";
import docx  from 'docx';

import common from "./util/common.mjs";

let now = new Date();
let nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
nextMonthStart.setMinutes(now.getMinutes() - now.getTimezoneOffset());
console.log(nextMonthStart);

common.llog.mylogWithTime("Finished")

