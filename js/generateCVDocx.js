import docx_cv from './cv/docx_cv.mjs'
import common from "./util/common.mjs";




await docx_cv.generateDocx();


common.llog.mylogWithTime("Finished!")



