const { mapDateToSentence, mapTimeToSentence } = require('./sentence');

describe('mapDateToSentence()', () => {
  it('takes a date and maps it to a display time', () => {
    const date = new Date('2017-12-16T21:10:09+01:00');
    expect(mapDateToSentence(date)).toEqual({ minutes: 'ZEHN', relation: 'NACH', hours: 'NEUN' });
  });
});

describe('mapTimeToSentence()', () => {
  it('maps a 12 hour time to a sentence', () => {
    expect(mapTimeToSentence('9:10')).toEqual({ minutes: 'ZEHN', relation: 'NACH', hours: 'NEUN' });
  });

  it('treats the minutes 1-10 as X NACH', () => {
    expect(mapTimeToSentence('9:01')).toEqual({ minutes: 'EINS', relation: 'NACH', hours: 'NEUN' });
    expect(mapTimeToSentence('9:02')).toEqual({ minutes: 'ZWEI', relation: 'NACH', hours: 'NEUN' });
    expect(mapTimeToSentence('9:10')).toEqual({ minutes: 'ZEHN', relation: 'NACH', hours: 'NEUN' });
  });

  it('treats the minutes 11-12 as ZEHN NACH', () => {
    expect(mapTimeToSentence('9:11')).toEqual({ minutes: 'ZEHN', relation: 'NACH', hours: 'NEUN' });
    expect(mapTimeToSentence('9:12')).toEqual({ minutes: 'ZEHN', relation: 'NACH', hours: 'NEUN' });
  });

  it('treats the minutes 13-17 as VIERTEL NACH', () => {
    expect(mapTimeToSentence('9:13')).toEqual({
      fraction: 'VIERTEL',
      relation: 'NACH',
      hours: 'NEUN',
    });
    expect(mapTimeToSentence('9:15')).toEqual({
      fraction: 'VIERTEL',
      relation: 'NACH',
      hours: 'NEUN',
    });
    expect(mapTimeToSentence('9:17')).toEqual({
      fraction: 'VIERTEL',
      relation: 'NACH',
      hours: 'NEUN',
    });
  });

  it('treats the minutes 18-35 as HALB', () => {
    expect(mapTimeToSentence('9:30')).toEqual({
      fraction: 'HALB',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:18')).toEqual({
      fraction: 'HALB',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:35')).toEqual({
      fraction: 'HALB',
      hours: 'ZEHN',
    });
  });

  it('treats the minutes 36-43 as ZWANZIG VOR', () => {
    expect(mapTimeToSentence('9:36')).toEqual({
      minutes: 'ZWANZIG',
      relation: 'VOR',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:40')).toEqual({
      minutes: 'ZWANZIG',
      relation: 'VOR',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:43')).toEqual({
      minutes: 'ZWANZIG',
      relation: 'VOR',
      hours: 'ZEHN',
    });
  });

  it('treats the minutes 44-47 as VIERTEL VOR', () => {
    expect(mapTimeToSentence('9:44')).toEqual({
      fraction: 'VIERTEL',
      relation: 'VOR',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:45')).toEqual({
      fraction: 'VIERTEL',
      relation: 'VOR',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:47')).toEqual({
      fraction: 'VIERTEL',
      relation: 'VOR',
      hours: 'ZEHN',
    });
  });

  it('treats the minutes 48-50 as ZEHN VOR', () => {
    expect(mapTimeToSentence('9:48')).toEqual({
      minutes: 'ZEHN',
      relation: 'VOR',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:50')).toEqual({
      minutes: 'ZEHN',
      relation: 'VOR',
      hours: 'ZEHN',
    });
  });

  it('treats minutes 51-59 as X VOR', () => {
    expect(mapTimeToSentence('9:51')).toEqual({
      minutes: 'NEUN',
      relation: 'VOR',
      hours: 'ZEHN',
    });
    expect(mapTimeToSentence('9:55')).toEqual({
      minutes: 'FÜNF',
      relation: 'VOR',
      hours: 'ZEHN',
    });
  });

  it('treats 9:00 as ES IST 9 UHR', () => {
    expect(mapTimeToSentence('9:00')).toEqual({
      it: 'ES',
      is: 'IST',
      hours: 'NEUN',
      oclock: 'UHR',
    });
  });
});
