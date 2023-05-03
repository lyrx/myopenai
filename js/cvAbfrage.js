const date1 = new Date("2023-05-02");
const date2 = new Date("2023-05-10");

const differenceInMilliseconds = date2 - date1;

// Konvertiere Millisekunden in andere Einheiten
const differenceInSeconds = differenceInMilliseconds / 1000;
const differenceInMinutes = differenceInSeconds / 60;
const differenceInHours = differenceInMinutes / 60;
const differenceInDays = differenceInHours / 24;

console.log("Zeitunterschied in Millisekunden:", differenceInMilliseconds);
console.log("Zeitunterschied in Sekunden:", differenceInSeconds);
console.log("Zeitunterschied in Minuten:", differenceInMinutes);
console.log("Zeitunterschied in Stunden:", differenceInHours);
console.log("Zeitunterschied in Tagen:", differenceInDays);



function monthDiff(date1, date2) {
    let months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();

    // Falls date2 kleiner ist als date1 wird ein negativer Wert zurückgegeben
    if (date2.getDate() < date1.getDate()) {
        months--;
    }

    return months;
}

const date1 = new Date("2023-05-02");
const date2 = new Date("2023-10-01");

const differenceInMonths = monthDiff(date1, date2);
console.log("Zeitunterschied in Monaten:", differenceInMonths);
