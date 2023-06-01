import cv from "./cv/cv.mjs";
import common from "./util/common.mjs"

common.llog.mylog(await cv.cvprompt(``,true));
