import React, { Component } from "react";
import SquareClock from "./SquareClock/SquareClock";
import styled, { injectGlobal } from "styled-components";

injectGlobal`
body {
  background-color: black;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`;

class App extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={`App ${className}`}>
        <SquareClock />
      </div>
    );
  }
}

App = styled(App)`
  margin-top: 25px;
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: center;
`;

export default App;
