import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs/react";

import { Button, Welcome } from "@storybook/react/demo";
import { Display, DisplayCharacter } from "../SquareClock/Display";

storiesOf("DisplayCharacter", module)
  .addDecorator(withKnobs)
  .add("with a 3", () => (
    <div>
      <DisplayCharacter character="3" illuminated />
      <DisplayCharacter character="3" illuminated={false} />
      <DisplayCharacter
        character={text("character", "3")}
        illuminated={boolean("illuminated", true)}
      />
    </div>
  ));

const viertelVorZehn = [
  "           ",
  "           ",
  "    VIERTEL",
  "VOR        ",
  "           ",
  "           ",
  "           ",
  "           ",
  "           ",
  "ZEHN       "
];
const zehn = [
  "ES IST     ",
  "           ",
  "           ",
  "           ",
  "           ",
  "           ",
  "           ",
  "           ",
  "           ",
  "ZEHN    UHR"
];

storiesOf("Display", module)
  .addDecorator(withKnobs)
  .add("with a readout", () => {
    const before = boolean("before", true);
    const readout = before ? viertelVorZehn : zehn;

    return (
      <div
        style={{
          backgroundColor: "black",
          display: "flex",
          placeItems: "center"
        }}
      >
        <Display readout={readout} />
      </div>
    );
  });
