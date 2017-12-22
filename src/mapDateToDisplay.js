//@ts-check
const { mapDateToSentence } = require("./sentence");
const { displaySentence } = require("./display");

function mapDateToDisplay(date) {
  const sentence = mapDateToSentence(date);
  const readout = displaySentence(sentence);
  return readout;
}

module.exports = { mapDateToDisplay };
