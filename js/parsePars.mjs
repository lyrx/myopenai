import {parseFile, splitText} from "./pars.mjs";
import {getCurrentDate_ddMMYYYY, getCurrentTime, mylog} from "../util/common.mjs";

const dir = '/Users/alex/git/public/lyrxp2p/public'
const file = 'phdg.md'


const text = `This is the first paragraph.
It spans multiple lines.

This is the second paragraph.
It also spans multiple lines.`;

const pars = await parseFile(dir,file)
mylog(JSON.stringify(pars[3]))



mylog(`Beendet um ${getCurrentTime()} Uhr am ${getCurrentDate_ddMMYYYY()}`)
