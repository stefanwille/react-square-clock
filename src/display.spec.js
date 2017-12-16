const _ = require('lodash');
const {
  displaySentence,
  displayWordWithinLines,
  findDisplayLineThatCanDisplayWord,
  makeEmptyReadout,
  displayWord,
} = require('./display');

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
