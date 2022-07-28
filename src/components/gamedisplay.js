// gamedisplay.js

import React from "react";
import Button from "./button";
import ScoreBox from "./scorebox";
import PlaySquare from "./playsquare";

const GameDisplay = (props) => {
  const playSquares = [];
  for (let i = 0; i < 9; i++) {
    playSquares.push(
      <PlaySquare
        key={i}
        id={i}
        mark={props.boardState[i]}
        clickfunction={props.boardState[i] === "" ? props.handleTurn : () => {}}
      />
    );
  }

  return (
    <div>
      <div className="game-display">
        <div className="game-display__icons">
          <img src={props.iconX} alt="x-icon" className="xo-icon" />
          <img src={props.iconO} alt="o-icon" className="xo-icon" />
        </div>
        <div className="game-display__turn-display">turn</div>
        <Button
          clickFunction={props.showModal}
          functionParameters={{
            show: true,
            heading: "restart game?",
            hideModalButton: "button1",
            button1Text: "no, cancel",
            button2Text: "yes, restart",
          }}
          colorClass="btn-silver"
          sizeClass="btn-reset"
          label=""
        />
        {playSquares}
        <ScoreBox
          player={"x (" + props.players.x + ")"}
          score={props.score.x}
          color="blue"
        />
        <ScoreBox player="ties" score={props.score.ties} color="silver" />
        <ScoreBox
          player={"o (" + props.players.o + ")"}
          score={props.score.o}
          color="yellow"
        />
      </div>
    </div>
  );
};

export default GameDisplay;
