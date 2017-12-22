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

  // it("maps any minute without crashing", () => {
  //   for (let minutes = 0; minutes < 60; minutes += 1) {
  //     console.log("minutes", minutes);
  //     const date = new Date(
  //       `2017-12-16T09:${String(minutes).padStart(2, "0")}:00+01:00`
  //     );
  //     mapDateToDisplay(date);
  //   }
  // });
  //
  // it('can map any hour without crashing', () => {
  //   for (let hours = 0; hours < 60; hours += 1) {
  //     mapTimeToSentence(`${hours}:0`);
  //   }
  // });
});
