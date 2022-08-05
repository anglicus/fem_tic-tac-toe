// gamedisplay.js

import React from "react";
import Button from "./button";
import ScoreBox from "./scorebox";
import PlaySquare from "./playsquare";
import { decideAIMove } from "../AI";

import restartIcon from "../assets/icon-restart.svg";

const GameDisplay = (props) => {
  const iconX = <img src={props.iconX} alt="x-icon" className="xo-icon" />;
  const iconO = <img src={props.iconO} alt="o-icon" className="xo-icon" />;

  const playSquares = [];

  let AITurn = false;

  if (props.players[props.turnMark] === "cpu" && props.winnerMark === "") {
    AITurn = true;
    const thinkingTime = Math.floor(Math.random() * 2000) + 300;
    const AIMove = decideAIMove(props.boardState, props.turnMark);
    setTimeout(() => {
      props.processMove(AIMove);
    }, thinkingTime);
  }

  for (let i = 0; i < 9; i++) {
    let canClick = true;
    if (AITurn || props.boardState[i] !== "") {
      canClick = false;
    }
    playSquares.push(
      <PlaySquare
        key={i}
        id={i}
        mark={props.boardState[i]}
        turnMark={props.turnMark}
        clickfunction={canClick ? props.processMove : () => {}}
      />
    );
  }

  return (
    <div className="game-display">
      <div
        className={`game-display__ai-screen ${AITurn ? "blocking" : ""}`}
      ></div>
      <div className="game-display__icons">
        {iconX}
        {iconO}
      </div>
      <div className="game-display__turn-display">
        {props.turnMark === "x" ? iconX : iconO}
        <p className="heading-xs">turn</p>
      </div>
      <Button
        clickFunction={props.showResetModal}
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
        layoutClass="game-display__score-box"
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
        layoutClass="game-display__score-box"
      />
    </div>
  );
};

export default GameDisplay;
