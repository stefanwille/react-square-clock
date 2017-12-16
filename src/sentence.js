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
  const hours = parseInt(hoursString);
  const minutes = parseInt(minutesString);
  const sentence = {};
  let nextHour = false;

  if (minutes === 0) {
    sentence.it = 'ES';
    sentence.is = 'IST';
    sentence.hours = hours;
    sentence.oclock = 'UHR';
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
    nextHour = true;
  } else if (minutes >= 36 && minutes <= 43) {
    sentence.minutes = 'ZWANZIG';
    sentence.relation = 'VOR';
    nextHour = true;
  } else if (minutes >= 44 && minutes <= 47) {
    sentence.fraction = 'VIERTEL';
    sentence.relation = 'VOR';
    nextHour = true;
  } else if (minutes >= 48 && minutes <= 50) {
    sentence.minutes = 'ZEHN';
    sentence.relation = 'VOR';
    nextHour = true;
  } else if (minutes >= 51 && minutes <= 59) {
    sentence.minutes = NUMBERS[60 - minutes];
    sentence.relation = 'VOR';
    nextHour = true;
  } else {
    throw new Error(`Ui?!? ${time}`);
  }

  sentence.hours = NUMBERS[nextHour ? hours + 1 : hours];

  return sentence;
}

module.exports = {
  mapTimeToSentence,
};
