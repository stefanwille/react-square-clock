const { mapDateToSentence } = require('./sentence');
const { displaySentence } = require('./display');

function mapTimeToDisplay(date) {
  const sentence = mapDateToSentence(date);
  const readout = displaySentence(sentence);
  return readout;
}

describe('mapTimeToDisplay', () => {
  describe('mapTimeToDisplay()', () => {
    it('takes a date and maps it to a display time', () => {
      const date = new Date('2017-12-16T21:15:09+01:00');
      expect(mapTimeToDisplay(date)).toEqual([
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
