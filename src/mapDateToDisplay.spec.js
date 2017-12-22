//@ts-check
const { mapDateToSentence } = require("./sentence");
const { displaySentence } = require("./display");
const { mapDateToDisplay } = require("./mapDateToDisplay");

describe("mapDateToDisplay", () => {
  it("takes a date and maps it to a readout", () => {
    const date = new Date("2017-12-16T09:15:00+01:00");
    expect(mapDateToDisplay(date)).toEqual([
      "           ",
      "           ",
      "    VIERTEL",
      "       NACH",
      "           ",
      "           ",
      "           ",
      "           ",
      "           ",
      "   NEUN    "
    ]);
  });

  describe("all hours", () => {
    for (let hours = 1; hours <= 12; hours += 1) {
      const hoursStr = String(hours).padStart(2, "0");
      const date = new Date(`2017-12-16T${hoursStr}:05:00+01:00`);

      it(`maps ${hours}:05`, () => {
        expect(mapDateToDisplay(date)).toMatchSnapshot();
      });
    }
  });

  describe("all minutes", () => {
    for (let minutes = 0; minutes < 60; minutes += 1) {
      const minutesStr = String(minutes).padStart(2, "0");
      const date = new Date(`2017-12-16T09:${minutesStr}:00+01:00`);

      it(`maps 09:${minutesStr}`, () => {
        expect(mapDateToDisplay(date)).toMatchSnapshot();
      });
    }
  });
});
