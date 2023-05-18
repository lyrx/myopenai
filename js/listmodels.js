import   openai  from "./openai/openai.mjs";
import {mylog} from "./util/common.mjs";

const response = await openai.openai.listModels();

mylog(JSON.stringify(response.data,null ,2))
