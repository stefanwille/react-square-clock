const _ = require('lodash');

const DISPLAY = [
  'ESKISTAFÜNF',
  'ZEHNZWANZIG',
  'DREIVIERTEL',
  'VORFUNKNACH',
  'HALBAELFÜNF',
  'EINSXAMZWEI',
  'DREIPMJVIER',
  'SECHSNLACHT',
  'SIEBENZWÖLF',
  'ZEHNEUNKUHR',
];

const EMPTY_DISPLAY_LINE = '           ';

function displaySentence({ it, is, minutes, fraction, relation, hours, oclock }) {
  let readout = makeEmptyReadout();
  readout = displayWordWithinLines({ readout, word: it, firstLine: 0, lastLine: 0 });
  readout = displayWordWithinLines({ readout, word: is, firstLine: 0, lastLine: 0 });
  readout = displayWordWithinLines({ readout, word: minutes, firstLine: 0, lastLine: 2 });
  readout = displayWordWithinLines({ readout, word: fraction, firstLine: 0, lastLine: 9 });
  readout = displayWordWithinLines({ readout, word: relation, firstLine: 3, lastLine: 3 });
  readout = displayWordWithinLines({ readout, word: hours, firstLine: 4, lastLine: 9 });
  readout = displayWordWithinLines({ readout, word: oclock, firstLine: 9, lastLine: 9 });
  return readout;
}

function displayWordWithinLines({ readout, word, firstLine, lastLine }) {
  if (!word) {
    // Nothing to display
    return readout;
  }

  const line = findDisplayLineThatCanDisplayWord({ word, firstLine, lastLine });
  if (line === undefined) {
    throw new Error(`Expected to find word ${word} within lines ${firstLine} and ${lastLine}`);
  }

  return displayWord(readout, word, line);
}

function findDisplayLineThatCanDisplayWord({ word, firstLine, lastLine }) {
  for (let line = firstLine; line <= lastLine; line += 1) {
    if (DISPLAY[line].includes(word)) {
      return line;
    }
  }

  return undefined;
}

function makeEmptyReadout() {
  const readout = [];
  for (let i = 0; i < DISPLAY.length; i += 1) {
    readout.push(EMPTY_DISPLAY_LINE);
  }

  return readout;
}

function displayWord(readout, word, line) {
  const index = DISPLAY[line].indexOf(word);
  if (index < 0) {
    throw new Error(`Cant find word ${word} in line ${line}`);
  }
  const newReadout = _.clone(readout);
  newReadout[line] =
    readout[line].substring(0, index) +
    word +
    readout[line].substring(index + word.length, EMPTY_DISPLAY_LINE.length);

  return newReadout;
}

module.exports = {
  displaySentence,
  displayWordWithinLines,
  findDisplayLineThatCanDisplayWord,
  makeEmptyReadout,
  displayWord,
};
