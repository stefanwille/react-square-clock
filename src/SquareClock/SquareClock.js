import React, { Component } from 'react';
import { mapDateToDisplay } from '../mapDateToDisplay';
import { makeEmptyReadout } from '../display';
import Display from './Display';

const UPDATE_INTERVAL_SECONDS = 1000;

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
    const readout = mapDateToDisplay(date);
    this.setState({ readout });
  }

  render() {
    const { readout } = this.state;
    return <Display readout={readout} />;
  }
}

export default SquareClock;
