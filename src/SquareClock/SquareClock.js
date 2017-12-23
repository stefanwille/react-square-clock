//@ts-check
import React, { Component } from "react";
import classNames from "classnames";
import "./SquareClock.css";
import { mapDateToDisplay } from "../mapDateToDisplay";
import { DISPLAY, makeEmptyReadout } from "../display";

const UPDATE_INTERVAL_SECONDS = 1000;

const DisplayCharacter = ({ character, illuminated }) => (
  <div className={classNames("Character", { illuminated })}>{character}</div>
);

const DisplayLine = ({ readoutLine, row }) =>
  readoutLine.split("").map((readoutCharacter, column) => {
    const displayCharacter = DISPLAY[row][column];
    const illuminated = readoutCharacter !== " ";
    return (
      <DisplayCharacter
        character={displayCharacter}
        illuminated={illuminated}
        key={column}
      />
    );
  });

const Display = ({ readout }) => (
  <div className="SquareClock">
    {readout.map((readoutLine, row) => (
      <DisplayLine readoutLine={readoutLine} row={row} key={row} />
    ))}
  </div>
);

export default class SquareClock extends Component {
  constructor(props) {
    super(props);
    this.state = { readout: makeEmptyReadout() };
  }

  componentDidMount() {
    this.updateReadout();
    setInterval(() => this.updateReadout(), UPDATE_INTERVAL_SECONDS * 1000);
  }

  updateReadout() {
    const date = new Date();
    const readout = mapDateToDisplay(date);
    this.setState({ readout });
  }

  render() {
    const { readout } = this.state;
    return <Display readout={readout} />;
  }
}
