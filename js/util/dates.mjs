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

function parseGermanDateString(dateString) {
    const [day, month, year] = dateString.split('.');
    const parsedDate = new Date(year, month - 1, day);
    return parsedDate;
}


function milliSecondsBetween(date1, date2) {
    const differenceInMilliseconds = date2 - date1;
    return differenceInMilliseconds;
}

function secondsBetween(date1, date2) {
    const differenceInMilliseconds = date2 - date1;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    return differenceInSeconds;
}

function minutesBetween(date1, date2) {
    const differenceInMilliseconds = date2 - date1;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    return differenceInMinutes;
}

function hoursBetween(date1, date2) {
    const differenceInMilliseconds = date2 - date1;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    return differenceInHours;
}

function daysBetween(date1, date2) {
    const differenceInMilliseconds = date2 - date1;
    const differenceInSeconds = differenceInMilliseconds / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    return differenceInDays;
}


/*
Beachte, dass diese Methode nur die Monatsdifferenz schätzt, ohne die verbleibenden Tage zu berücksichtigen.
 Wenn du eine genauere Berechnung benötigst, kannst du den Zeitunterschied in Tagen berechnen und dann durch
 die durchschnittliche Anzahl von Tagen pro Monat teilen (z.B. 30,44 Tage).
 Beachte jedoch, dass dieser Ansatz auch nicht perfekt ist, da er die unterschiedliche Anzahl
  von Tagen in verschiedenen Monaten nicht berücksichtigt.
 */
function monthsBetween(date1, date2) {
    let yearsDifference = date2.getFullYear() - date1.getFullYear();
    let monthsDifference = date2.getMonth() - date1.getMonth();

// Berechne die Gesamtdifferenz in Monaten
    let totalMonthsDifference = yearsDifference * 12 + monthsDifference;

    return totalMonthsDifference;

}

function yearsBetween(date1, date2) {
    // Berechne die Differenz in Millisekunden
    let differenceInMilliseconds = date2 - date1;

// Konvertiere die Differenz in Tage
    let differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

// Konvertiere die Differenz in Jahre
    let differenceInYears = differenceInDays / 365.25;
    return differenceInYears;

}

function stringToDates(inputString) {
    const regexSeparator = /\s*-\s*/;
    const [dateString1, dateString2] = inputString.split(regexSeparator);
    return [parseGermanDateString(dateString1), parseGermanDateString(dateString2)]

}

export {
    getCurrentTime,
    getCurrentDate_ddMMYYYY,
    parseGermanDateString,
    milliSecondsBetween,
    secondsBetween,
    minutesBetween,
    hoursBetween,
    daysBetween,
    monthsBetween,
    yearsBetween,
    stringToDates

};
