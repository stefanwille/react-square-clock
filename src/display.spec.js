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

  describe('findDisplayLineThatCanDisplayWord()', () => {
    it('finds the line number within given boundaries in the display that contains the given word', () => {
      expect(
        findDisplayLineThatCanDisplayWord({ word: 'VIERTEL', firstLine: 0, lastLine: 5 })
      ).toBe(2);
      expect(findDisplayLineThatCanDisplayWord({ word: 'NACH', firstLine: 0, lastLine: 5 })).toBe(
        3
      );
    });

    it('handles ES', () => {
      expect(findDisplayLineThatCanDisplayWord({ word: 'ES', firstLine: 0, lastLine: 0 })).toBe(0);
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

    it('handles ZEHN NACH NEUN', () => {
      expect(displaySentence({ minutes: 'ZEHN', relation: 'NACH', hours: 'NEUN' })).toEqual([
        '           ',
        'ZEHN       ',
        '           ',
        '       NACH',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '   NEUN    ',
      ]);
    });

    it('handles ES IST DREI UHR', () => {
      expect(
        displaySentence({
          it: 'ES',
          is: 'IST',
          minutes: undefined,
          relation: undefined,
          hours: 'NEUN',
          oclock: 'UHR',
        })
      ).toEqual([
        'ES IST     ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '   NEUN UHR',
      ]);
    });

    it('handles VIERTEL NACH NEUN', () => {
      expect(
        displaySentence({
          fraction: 'VIERTEL',
          relation: 'NACH',
          hours: 'NEUN',
        })
      ).toEqual([
        '           ',
        '           ',
        '    VIERTEL',
        '       NACH',
        '           ',
        '           ',
        '           ',
        '           ',
        '           ',
        '   NEUN    ',
      ]);
    });
  });
});
