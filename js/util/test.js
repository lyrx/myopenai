import {mylog, mylogObject} from "./common.mjs";

import {readCV_object,readCV} from "../cv/cv.mjs";


mylogObject(await readCV_object());

