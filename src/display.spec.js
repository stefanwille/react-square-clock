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
  const newReadout = _.cloneDeep(readout);
  newReadout[line] =
    readout[line].substring(0, index) +
    word +
    readout[line].substring(index + word.length, EMPTY_DISPLAY_LINE.length);

  return newReadout;
}

function mapSentenceToDisplay(sentence) {
  const words = sentence.split(' ');
  let wordsIndex = 0;
  const readout = DISPLAY.map(displayLine => {
    let currentReadoutLine = '';
    let currentLineIndex = 0;
    if (wordsIndex >= words.length) {
      return EMPTY_DISPLAY_LINE;
    }
    while (true) {
      if (wordsIndex >= words.length) {
        // Append spaces for the line up to the match
        currentReadoutLine += EMPTY_DISPLAY_LINE.substring(
          currentLineIndex,
          EMPTY_DISPLAY_LINE.length
        );
        return currentReadoutLine;
      }
      const currentWord = words[wordsIndex];
      const matchIndex = displayLine.indexOf(currentWord, currentLineIndex);
      if (!matchIndex) {
        // Append spaces for the line up to the match
        currentReadoutLine += EMPTY_DISPLAY_LINE.substring(currentLineIndex, matchIndex);
        return currentReadoutLine;
      } else {
        // Append spaces for the line up to the match
        currentReadoutLine += EMPTY_DISPLAY_LINE.substring(currentLineIndex, matchIndex);
        // APPEND the actual word
        currentReadoutLine += currentWord;
        // We are done with this word
        wordsIndex += 1;
        currentLineIndex = currentReadoutLine.length;
      }
    }
  });

  return readout;
}

describe('display', () => {
  describe('makeEmptyReadout()', () => {
    it('returns an empty readout', () => {
      expect(makeEmptyReadout()).toEqual([
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
      ]);
    });
  });

  describe('displayWord()', () => {
    it('updates a readout', () => {
      const readout = makeEmptyReadout();
      expect(displayWord(readout, 'VIER', 2)).toEqual([
        '           ',
        '           ',
        '    VIER   ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
      ]);
    });

    it('handles the same number in different places', () => {
      const readout = makeEmptyReadout();
      expect(displayWord(readout, 'VIER', 6)).toEqual([
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '       VIER',
        '           ',
        '           ',
        '           ',
      ]);
    });

    it('can update a readout', () => {
      let readout = makeEmptyReadout();
      readout = displayWord(readout, 'VIERTEL', 2);
      readout = displayWord(readout, 'VOR', 3);
      readout = displayWord(readout, 'ZWEI', 5);
      expect(readout).toEqual([
        '           ',
        '           ',
        '    VIERTEL',
        'VOR        ',
        '           ',
        '       ZWEI',
        '           ',
        '           ',
        '           ',
        '           ',
      ]);
    });
  });
  // describe('mapSentenceToDisplay()', () => {
  //   it('handles VIERTEL VOR ZWEI', () => {
  //     expect(mapSentenceToDisplay('VIERTEL VOR ZWEI')).toEqual([
  //       '           ',
  //       '           ',
  //       '    VIERTEL',
  //       'VOR        ',
  //       '           ',
  //       '       ZWEI',
  //       '           ',
  //       '           ',
  //       '           ',
  //       '           ',
  //     ]);
  //   });
  //
  //   it('handles VIERTEL NACH ZWEI', () => {
  //     expect(mapSentenceToDisplay('VIERTEL NACH ZWEI')).toEqual([
  //       '           ',
  //       '           ',
  //       '    VIERTEL',
  //       '       NACH',
  //       '           ',
  //       '       ZWEI',
  //       '           ',
  //       '           ',
  //       '           ',
  //       '           ',
  //     ]);
  //   });
  // });
});
