import {Configuration, OpenAIApi} from "openai";
import common from "../util/common.mjs";


const configuration = new Configuration({
    organization: "org-iX3AplRFfPst8hdpXcv7gfv2",
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);




export default  openai;
