import common from "./util/common.mjs";
import chat from "./cv/chat_completion.mjs"



const completion = await chat.cvCompletion();

common.llog.mylog(completion.data.choices[0].message.content);


common.llog.mylogWithTime("Finished!")



