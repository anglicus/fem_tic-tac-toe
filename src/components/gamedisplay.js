// gamedisplay.js

import React from "react";
import Button from "./button";
import ScoreBox from "./scorebox";
import PlaySquare from "./playsquare";
import { decideAIMove } from "../AI";

import restartIcon from "../assets/icon-restart.svg";

const GameDisplay = (props) => {
  const urlStrX = "URL(" + props.iconX + ")";
  const urlStrO = "URL(" + props.iconO + ")";
  const maskImgX = { maskImage: urlStrX };
  const maskImgO = { maskImage: urlStrO };

  const maskElement =
    props.turnMark === "x" ? (
      <div className="game-display__turnmask" style={maskImgX}></div>
    ) : (
      <div className="game-display__turnmask" style={maskImgO}></div>
    );

  const iconX = <img src={props.iconX} alt="x-icon" className="xo-icon" />;
  const iconO = <img src={props.iconO} alt="o-icon" className="xo-icon" />;

  const playSquares = [];

  // assume it's not the AI's turn
  let AITurn = false;

  // but check to see if it is ...
  if (props.players[props.turnMark] === "cpu" && props.winnerMark === "") {
    // if so, get the AI's best move, then call processMove()
    // which will cause a render
    AITurn = true;
    const thinkingTime = Math.floor(Math.random() * 2000) + 300;
    const AIMove = decideAIMove(props.boardState, props.turnMark);
    setTimeout(() => {
      props.processMove(AIMove);
    }, thinkingTime);
  }

  // if someone won, and the modal is not already being shown,
  // show it after a short delay (so we can see the winning line)
  if (props.winnerMark !== "" && !props.modalShown) {
    setTimeout(() => {
      props.showWinningModal();
    }, 1000);
  }

  // fill an array with play squares, with empty squares clickable
  for (let i = 0; i < 9; i++) {
    let canClick = true;
    if (props.boardState[i] !== "") {
      canClick = false;
    }
    playSquares.push(
      <PlaySquare
        key={i}
        id={i}
        winning={props.winningLine.includes(i) ? props.winnerMark : ""}
        mark={props.boardState[i]}
        turnMark={props.turnMark}
        clickfunction={canClick ? props.processMove : () => {}}
      />
    );
  }

  // we want to block clicks on squares and buttons if either
  // the AI is taking its turn, or if a win just happened, before the modal appears
  let screenBlock = false;
  if (AITurn || (props.winnerMark !== "" && !props.modalShown)) {
    screenBlock = true;
  }

  return (
    <div className="game-display">
      <div
        className={`game-display__screen ${screenBlock ? "blocking" : ""}`}
      ></div>
      <div className="game-display__icons">
        {iconX}
        {iconO}
      </div>
      <div className="game-display__turn-display">
        {maskElement}
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
