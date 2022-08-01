// gamedisplay.js

import React from "react";
import Button from "./button";
import ScoreBox from "./scorebox";
import PlaySquare from "./playsquare";

import restartIcon from "../assets/icon-restart.svg";

const GameDisplay = (props) => {
  const iconX = <img src={props.iconX} alt="x-icon" className="xo-icon" />;
  const iconO = <img src={props.iconO} alt="o-icon" className="xo-icon" />;

  const playSquares = [];
  for (let i = 0; i < 9; i++) {
    playSquares.push(
      <PlaySquare
        key={i}
        id={i}
        mark={props.boardState[i]}
        turnMark={props.turnMark}
        clickfunction={props.boardState[i] === "" ? props.handleTurn : () => {}}
      />
    );
  }

  return (
    <div className="game-display">
      <div className="game-display__icons">
        {iconX}
        {iconO}
      </div>
      <div className="game-display__turn-display">
        {props.turnMark === "x" ? iconX : iconO}
        <p>turn</p>
      </div>
      <Button
        clickFunction={props.showModal}
        functionParameters={{
          show: true,
          heading: "restart game?",
          hideModalButton: "button1",
          button1Text: "no, cancel",
          button2Text: "yes, restart",
        }}
        layoutClass="game-display__btn-reset"
        colorClass="btn--silver"
        sizeClass="btn--square"
        label={<img src={restartIcon} alt="restart icon" />}
      />
      {playSquares}
      <ScoreBox
        player={"x (" + props.players.x + ")"}
        score={props.score.x}
        colorClass="score-box--blue"
      />
      <ScoreBox
        player="ties"
        score={props.score.ties}
        colorClass="score-box--silver"
      />
      <ScoreBox
        player={"o (" + props.players.o + ")"}
        score={props.score.o}
        colorClass="score-box--yellow"
      />
    </div>
  );
};

export default GameDisplay;
