//@ts-check
import React, { Component } from "react";
import classNames from "classnames";
import "./SquareClock.css";
import { mapDateToDisplay } from "../mapDateToDisplay";
import { DISPLAY, makeEmptyReadout } from "../display";

const Character = ({ character, glowing }) => (
  <div className={classNames("Character", { glowing })}>{character}</div>
);

const Display = ({ readout }) => (
  <div className="SquareClock">
    {readout.map((line, rowIndex) =>
      line.split("").map((readoutCharacter, columnIndex) => {
        const displayCharacter = DISPLAY[rowIndex][columnIndex];
        const glowing = readoutCharacter !== " ";
        const key = `${rowIndex}-${columnIndex}`;
        return (
          <Character character={displayCharacter} glowing={glowing} key={key} />
        );
      })
    )}
  </div>
);

export default class SquareClock extends Component {
  constructor(props) {
    super(props);
    this.state = { readout: makeEmptyReadout() };
  }

  componentDidMount() {
    this.updateReadout();
    setInterval(() => this.updateReadout(), 1 * 1000);
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
