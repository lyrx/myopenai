function monthsBetween(date1, date2) {
    const yearsDifference = date2.getFullYear() - date1.getFullYear();
    const monthsDifference = date2.getMonth() - date1.getMonth();
    return yearsDifference * 12 + monthsDifference + (date2.getDate() < date1.getDate() ? -1 : 0);
}

const startDate = new Date('2021-10-01');
const endDate = new Date('2022-12-31');

const durationInMonths = monthsBetween(startDate, endDate);
console.log(durationInMonths); // Output: 14




const dateString = "01.10.2021 – 31.12.2022";
const dateArray = dateString.split(' – ');

const startDate2 = new Date(dateArray[0].split('.').reverse().join('-'));
const endDate2 = new Date(dateArray[1].split('.').reverse().join('-'));

console.log(startDate2); // Output: Fri Oct 01 2021 00:00:00 GMT+0000 (Coordinated Universal Time)
console.log(endDate2); // Output: Sat Dec 31 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
