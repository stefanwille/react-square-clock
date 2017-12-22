//@ts-check
const { mapDateToSentence, mapTimeToSentence } = require("./sentence");

function toNaturalLanguage(sentence) {
  const { it, is, minutes, fraction, relation, hours, oclock } = sentence;
  const words = [it, is, minutes, fraction, relation, hours, oclock].filter(
    word => !!word
  );
  const natural = words.join(" ");
  return natural;
}

describe("mapDateToSentence()", () => {
  it("takes a date and maps it to a display time", () => {
    const date = new Date("2017-12-16T21:10:09+01:00");
    expect(mapDateToSentence(date)).toEqual({
      minutes: "ZEHN",
      relation: "NACH",
      hours: "NEUN"
    });
  });
});

describe("mapTimeToSentence()", () => {
  describe("with a time", () => {
    it("maps a 12 hour time to a sentence", () => {
      expect(mapTimeToSentence("9:10")).toEqual({
        minutes: "ZEHN",
        relation: "NACH",
        hours: "NEUN"
      });
    });

    it("can be read as natural language", () => {
      expect(toNaturalLanguage(mapTimeToSentence("9:10"))).toBe(
        "ZEHN NACH NEUN"
      );
    });
  });

  describe("all hours", () => {
    for (let hours = 1; hours <= 12; hours += 1) {
      const time = `${hours}:05`;
      it(`maps ${time}`, () => {
        expect(toNaturalLanguage(mapTimeToSentence(time))).toMatchSnapshot();
      });
    }
  });

  describe("all minutes", () => {
    for (let minutes = 1; minutes < 60; minutes += 1) {
      const time = `3:${minutes}`;
      it.only(`maps ${time}`, () => {
        expect(toNaturalLanguage(mapTimeToSentence(time))).toMatchSnapshot();
      });
    }
  });
});
