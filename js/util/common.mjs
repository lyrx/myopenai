function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}


function getCurrentDate_ddMMYYYY() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we need to add 1
    const year = now.getFullYear();

    return `${day}.${month}.${year}`;
}

function mylog(s) {
    console.log(s);
}

function myerror(s) {
    console.error(s);
}


export {getCurrentTime, getCurrentDate_ddMMYYYY, mylog, myerror};
