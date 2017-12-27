import React, { Component } from 'react';
import './App.css';
import SquareClock from './SquareClock/SquareClock';
import styled from 'styled-components';

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
