import cv from "./cv/cv.mjs";
import common from "./util/common.mjs"

common.llog.mylog(await cv.cvprompt(`Schreibe eine Kurzbeschreibung Deiner Person in einem Satz.`,true));
