// gamedisplay.js

import React, { useState } from "react";
import Button from "./button";
import ScoreBox from "./scorebox";
import PlaySquare from "./playsquare";
import BannerModal from "./bannermodal";

import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";

const GameDisplay = (props) => {
  const [turnMark, setTurnMark] = useState("x");
  const [squareMarks, setSquareMarks] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [winnerMark, setWinnerMark] = useState("");
  const [modalParameters, setModalParameters] = useState({
    show: false,
  });

  const showModal = (parameters) => {
    setModalParameters(parameters);
  };

  const hideModal = () => {
    setModalParameters({
      show: false,
    });

    // when the modal was shown due to a winner, reset the board
    if (winnerMark !== "") {
      setWinnerMark("");
      setTurnMark("x");
      setSquareMarks(["", "", "", "", "", "", "", "", ""]);
    }
  };

  const handleWinner = (winnerMark) => {
    setWinnerMark(winnerMark);
    props.scoreFunction(winnerMark);
    console.log("winning a game");
    showModal({
      show: true,
      pText: "someone won",
      heading: "takes the round",
      hideModalButton: "button2",
      button1Text: "quit",
      button2Text: "next round",
    });
  };

  const testForWin = () => {
    console.log("testing for win");
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let i = 0;
    let win = false;
    while (!win && i < winningLines.length) {
      if (
        squareMarks[winningLines[i][0]] === squareMarks[winningLines[i][1]] &&
        squareMarks[winningLines[i][1]] === squareMarks[winningLines[i][2]] &&
        squareMarks[winningLines[i][0]] === turnMark
      ) {
        console.log("got a winner on", winningLines[i]);
        win = true;
        handleWinner(turnMark);
        return;
      }
      i++;
    }

    if (turnMark === "x") {
      setTurnMark("o");
    } else {
      setTurnMark("x");
    }
  };

  const handleMark = (id) => {
    var newSquareMarks = squareMarks;
    newSquareMarks[id] = turnMark;
    setSquareMarks(newSquareMarks);
    testForWin();
  };

  const playSquares = [];
  for (let i = 0; i < 9; i++) {
    playSquares.push(
      <PlaySquare
        key={i}
        id={i}
        mark={squareMarks[i]}
        clickfunction={squareMarks[i] === "" ? handleMark : () => {}}
      />
    );
  }

  return (
    <div>
      <BannerModal
        hideModal={hideModal}
        resetFunction={props.resetFunction}
        parameters={modalParameters}
      />
      <div className="game-display">
        <div className="game-display__icons">
          <img src={iconX} alt="x-icon" className="xo-icon" />
          <img src={iconO} alt="o-icon" className="xo-icon" />
        </div>
        <div className="game-display__turn-display">turn</div>
        <Button
          clickfunction={showModal}
          parameters={{
            show: true,
            pText: null,
            heading: "restart game?",
            hideModalButton: "button1",
            button1Text: "no, cancel",
            button2Text: "yes, restart",
          }}
          color="btn-silver"
          size="btn-reset"
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
