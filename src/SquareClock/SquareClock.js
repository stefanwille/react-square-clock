import React, { Component } from "react";
import { mapDateToDisplay } from "../mapDateToDisplay";
import { makeEmptyReadout } from "../display";
import Display from "./Display";

const UPDATE_INTERVAL_SECONDS = 60;

class SquareClock extends Component {
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
    console.log("*updateReadout date", date);
    const readout = mapDateToDisplay(date);
    console.log("readout");
    console.log(readout.join("\n"));
    this.setState({ readout });
  }

  render() {
    const { readout } = this.state;
    return <Display readout={readout} />;
  }
}

export default SquareClock;
