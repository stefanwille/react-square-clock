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

storiesOf("Display", module).add("with a readout", () => (
  <div style={{ backgroundColor: "black" }}>
    <Display
      readout={[
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
      ]}
    />
  </div>
));
