//@ts-check
const { mapDateToSentence, mapTimeToSentence, toNaturalLanguage } = require('./sentence');

describe('mapDateToSentence()', () => {
  it('takes a date and maps it to a display time', () => {
    const date = new Date('2017-12-16T21:10:09+01:00');
    expect(mapDateToSentence(date)).toEqual({
      minutes: 'ZEHN',
      relation: 'NACH',
      hours: 'NEUN',
    });
  });
});

describe('mapTimeToSentence()', () => {
  describe('with a time', () => {
    it('maps a 12 hour time to a sentence', () => {
      expect(mapTimeToSentence('9:10')).toEqual({
        minutes: 'ZEHN',
        relation: 'NACH',
        hours: 'NEUN',
      });
    });

    it('can be converted to natural language', () => {
      expect(toNaturalLanguage(mapTimeToSentence('9:10'))).toBe('ZEHN NACH NEUN');
    });
  });

  describe('all hours', () => {
    for (let hours = 1; hours <= 12; hours += 1) {
      const time = `${String(hours).padStart(2, '0')}:05`;
      it(`maps ${time}`, () => {
        expect(toNaturalLanguage(mapTimeToSentence(time))).toMatchSnapshot();
      });
    }
  });

  describe('all minutes', () => {
    for (let minutes = 0; minutes <= 59; minutes += 1) {
      const time = `03:${String(minutes).padStart(2, '0')}`;
      it(`maps ${time}`, () => {
        expect(toNaturalLanguage(mapTimeToSentence(time))).toMatchSnapshot();
      });
    }
  });

  describe("with 12:50", () => {
    it("wraps around to 1", () => {
      expect(toNaturalLanguage(mapTimeToSentence("12:50"))).toBe("ZEHN VOR EINS");
    });
  });  
});
