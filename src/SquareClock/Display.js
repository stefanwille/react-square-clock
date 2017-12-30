import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DISPLAY } from "../display";
import styled from "styled-components";

export let DisplayCharacter = ({ character, className }) => (
  <div className={classNames("DisplayCharacter", className)}>{character}</div>
);

DisplayCharacter = styled(DisplayCharacter)`
  font-family: sans-serif;
  background-color: #222;
  color: ${props =>
    props.illuminated ? `rgba(255, 255, 255, 1)` : `rgba(255, 255, 255, 0.1)`};
  border-radius: 5px;
  width: 55px;
  height: 55px;
  line-height: 55px;
  font-size: 200%;
  margin: 2px;
  text-align: center;
  transition: color 0.5s ease-in;
`;

DisplayCharacter.propTypes = {
  illuminated: PropTypes.bool.isRequired,
  character: PropTypes.string.isRequired,
  className: PropTypes.string
};

let DisplayLine = ({ readoutLine, row, className }) => {
  const characters = readoutLine.split("");
  return (
    <div className={classNames("DisplayLine", className)}>
      {characters.map((readoutCharacter, column) => {
        const displayCharacter = DISPLAY[row][column];
        const illuminated = readoutCharacter !== " ";
        return (
          <DisplayCharacter
            character={displayCharacter}
            illuminated={illuminated}
            key={column}
          />
        );
      })}
    </div>
  );
};

DisplayLine = styled(DisplayLine)`
  display: flex;
`;

DisplayLine.propTypes = {
  readoutLine: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  className: PropTypes.string
};

export let Display = ({ readout }) => (
  <div className="SquareClock">
    {readout.map((readoutLine, row) => (
      <DisplayLine readoutLine={readoutLine} row={row} key={row} />
    ))}
  </div>
);

Display = styled(Display)`
  color: #444;
`;

Display.propTypes = {
  readout: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default Display;
