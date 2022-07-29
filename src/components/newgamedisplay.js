// newgamedisplay.js

import React, { useState } from "react";
import Button from "./button";

const NewGameDisplay = (props) => {
  const [marks, setMarks] = useState({ p1: "x", p2: "o" });

  const updateOptions = (e) => {
    if (e.target.checked) {
      setMarks({ p1: "o", p2: "x" });
    } else {
      setMarks({ p1: "x", p2: "o" });
    }
  };

  return (
    <div className="newgame-display">
      <div className="newgame-display__icons">
        <img src={props.iconX} alt="x-icon" className="xo-icon" />
        <img src={props.iconO} alt="o-icon" className="xo-icon" />
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
          clickFunction={props.startGame}
          functionParameters={{
            marks: marks,
            players: { p1: "you", p2: "cpu" },
          }}
          colorClass="btn--yellow"
          sizeClass="btn--primary"
          label="new game (vs cpu)"
        />
        <Button
          clickFunction={props.startGame}
          functionParameters={{ marks: marks, players: { p1: "p1", p2: "p2" } }}
          colorClass="btn--blue"
          sizeClass="btn--primary"
          label="new game (vs player)"
        />
      </div>
    </div>
  );
};

export default NewGameDisplay;
