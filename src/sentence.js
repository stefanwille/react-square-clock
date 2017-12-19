const moment = require('moment');

function mapDateToSentence(date) {
  const time = moment(date).format('hh:mm');
  return mapTimeToSentence(time);
}

const NUMBERS = [
  'null',
  'EINS',
  'ZWEI',
  'DREI',
  'VIER',
  'FÜNF',
  'SECHS',
  'SIEBEN',
  'ACHT',
  'NEUN',
  'ZEHN',
  'ELF',
  'ZWÖLF',
];

function mapTimeToSentence(time) {
  const [hoursString, minutesString] = time.split(':');
  let hours = parseInt(hoursString, 10);
  const minutes = parseInt(minutesString, 10);
  const sentence = {};

  if (minutes === 0) {
    sentence.it = 'ES';
    sentence.is = 'IST';
    sentence.hours = hours;
    sentence.oclock = 'UHR';
    // 3, 4, 5,
  } else if (minutes >= 1 && minutes <= 10) {
    sentence.minutes = NUMBERS[minutes];
    sentence.relation = 'NACH';
  } else if (minutes >= 11 && minutes <= 12) {
    sentence.minutes = NUMBERS[10];
    sentence.relation = 'NACH';
  } else if (minutes >= 13 && minutes <= 17) {
    sentence.fraction = 'VIERTEL';
    sentence.relation = 'NACH';
  } else if (minutes >= 18 && minutes <= 35) {
    sentence.fraction = 'HALB';
    hours += 1;
  } else if (minutes >= 36 && minutes <= 43) {
    sentence.minutes = 'ZWANZIG';
    sentence.relation = 'VOR';
    hours += 1;
  } else if (minutes >= 44 && minutes <= 47) {
    sentence.fraction = 'VIERTEL';
    sentence.relation = 'VOR';
    hours += 1;
  } else if (minutes >= 48 && minutes <= 50) {
    sentence.minutes = 'ZEHN';
    sentence.relation = 'VOR';
    hours += 1;
  } else if (minutes >= 51 && minutes <= 59) {
    sentence.minutes = NUMBERS[60 - minutes];
    sentence.relation = 'VOR';
    hours += 1;
  } else {
    throw new Error(`How do I deal with this time?!? ${time}`);
  }

  hours = hours % 12;
  sentence.hours = NUMBERS[hours];

  return sentence;
}

module.exports = {
  mapDateToSentence,
  mapTimeToSentence,
};
