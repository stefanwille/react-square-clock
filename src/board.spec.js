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

function displaySentence({ minutes, relation, hours }) {
  return makeEmptyReadout();
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
    it('puts the given word in a readout in the given line', () => {
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

    it('displays the same word in different lines', () => {
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

  describe('displaySentence()', () => {
    it('displays the given sentence in a readout', () => {
      expect(displaySentence({ minutes: 'VIERTEL', relation: 'VOR', hours: 'ZWEI' })).toEqual([
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
