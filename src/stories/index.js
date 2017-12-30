import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import { Display, DisplayCharacter } from "../SquareClock/Display";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button!</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
  ));

storiesOf("DisplayCharacter", module).add("with a 3", () => (
  <div>
    <DisplayCharacter character="3" illuminated />
    <DisplayCharacter character="3" illuminated={false} />
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
