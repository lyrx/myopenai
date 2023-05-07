import cv from "./cv/cv.mjs";
import common from "./util/common.mjs"

common.llog.mylog(await cv.cvprompt(`Wie viel Erfahrung hast du mit Java. Gib alle Firmen an.`));
