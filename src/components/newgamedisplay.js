// newgamedisplay.js

import React, { useState } from "react";
import Button from "./button";

import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";

const NewGameDisplay = (props) => {
  const [mark, setMark] = useState("x");

  const updateOptions = (e) => {
    if (e.target.checked) {
      setMark("o");
    } else {
      setMark("x");
    }
  };

  return (
    <div className="newgame-display">
      <div className="newgame-display__icons">
        <img src={iconX} alt="x-icon" className="xo-icon" />
        <img src={iconO} alt="o-icon" className="xo-icon" />
      </div>
      <div className="player-mark-chooser">
        <h1>Pick player 1's mark</h1>
        <label htmlFor="xo-chooser" className="switch">
          <input type="checkbox" onChange={updateOptions}></input>
        </label>
        <p>remember : x goes first</p>
      </div>
      <div className="newgame-display__button-div">
        <Button
          clickfunction={props.startGame}
          parameters={{ p1: mark, p2: "cpu" }}
          color="btn-yellow"
          size="btn-primary"
          label="new game (vs cpu)"
        />
        <Button
          clickfunction={props.startGame}
          parameters={{ p1: mark, p2: "p2" }}
          color="btn-blue"
          size="btn-primary"
          label="new game (vs player)"
        />
      </div>
    </div>
  );
};

export default NewGameDisplay;
