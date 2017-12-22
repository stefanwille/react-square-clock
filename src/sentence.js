//@ts-check
const moment = require("moment");

function mapDateToSentence(date) {
  const time = moment(date).format("hh:mm");
  return mapTimeToSentence(time);
}

const NUMBERS = new Map([
  [1, "EINS"],
  [2, "ZWEI"],
  [3, "DREI"],
  [4, "VIER"],
  [5, "FÜNF"],
  [6, "SECHS"],
  [7, "SIEBEN"],
  [8, "ACHT"],
  [9, "NEUN"],
  [10, "ZEHN"],
  [11, "ELF"],
  [12, "ZWÖLF"],
  [20, "ZWANZIG"]
]);

function mapTimeToSentence(time) {
  const [hoursString, minutesString] = time.split(":");
  const hours = parseInt(hoursString, 10);
  const minutes = parseInt(minutesString, 10);
  const minutesBefore = 60 - minutes;
  const sentence = {};

  let displayHours = hours;

  if (minutes <= 2) {
    sentence.it = "ES";
    sentence.is = "IST";
    sentence.oclock = "UHR";
  } else if (minutes >= 3 && minutes <= 7) {
    sentence.minutes = NUMBERS.get(5);
    sentence.relation = "NACH";
  } else if (minutes >= 8 && minutes <= 12) {
    sentence.minutes = NUMBERS.get(10);
    sentence.relation = "NACH";
  } else if (minutes >= 13 && minutes <= 17) {
    sentence.fraction = "VIERTEL";
    sentence.relation = "NACH";
  } else if (minutes >= 18 && minutes <= 24) {
    sentence.minutes = NUMBERS.get(20);
    sentence.relation = "NACH";
  } else if (minutes >= 25 && minutes <= 35) {
    sentence.fraction = "HALB";
    displayHours += 1;
  } else if (minutesBefore >= 18 && minutesBefore <= 24) {
    sentence.minutes = NUMBERS.get(20);
    sentence.relation = "VOR";
    displayHours += 1;
  } else if (minutesBefore >= 13 && minutesBefore <= 17) {
    sentence.fraction = "VIERTEL";
    sentence.relation = "VOR";
    displayHours += 1;
  } else if (minutesBefore >= 8 && minutesBefore <= 12) {
    sentence.minutes = NUMBERS.get(10);
    sentence.relation = "VOR";
    displayHours += 1;
  } else if (minutesBefore >= 3 && minutesBefore <= 7) {
    sentence.minutes = NUMBERS.get(5);
    sentence.relation = "VOR";
    displayHours += 1;
  } else if (minutesBefore <= 2) {
    sentence.it = "ES";
    sentence.is = "IST";
    displayHours += 1;
    sentence.oclock = "UHR";
  } else {
    throw new Error(`How do I deal with this time?!? ${time}`);
  }

  displayHours = displayHours % 13;
  sentence.hours = NUMBERS.get(displayHours);

  return sentence;
}

module.exports = {
  mapDateToSentence,
  mapTimeToSentence
};
