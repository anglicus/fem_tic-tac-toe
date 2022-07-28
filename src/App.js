import { useState, useEffect } from "react";

import NewGameDisplay from "./components/newgamedisplay";
import GameDisplay from "./components/gamedisplay";
import BannerModal from "./components/bannermodal";

import iconX from "./assets/icon-x.svg";
import iconO from "./assets/icon-o.svg";

import "./css/app.css";

///////////////////////////////////////////////////////////////////////////////////////////

function App() {
  // state variables //////////////////////////////////////////////////////////////////////
  const [gameInProgress, setGameInProgress] = useState(false);
  const [boardState, setBoardState] = useState([
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
  const [score, setScore] = useState({ x: 0, o: 0, ties: 0 });

  const [players, setPlayers] = useState({ x: null, o: null });

  const [modalParameters, setModalParameters] = useState({
    show: false,
  });

  const [turnMark, setTurnMark] = useState("x");
  const [turnCount, setTurnCount] = useState(0);
  const [winnerMark, setWinnerMark] = useState("");

  // modal functions //////////////////////////////////////////////////////////////////////
  const showModal = (parameters) => {
    setModalParameters(parameters);
  };

  const hideModal = () => {
    setModalParameters({
      show: false,
    });

    // when the modal was shown due to a winner, reset the board
    // and return to "x" turn
    if (winnerMark !== "") {
      setWinnerMark("");
      setTurnMark("x");
      setBoardState(["", "", "", "", "", "", "", "", ""]);
    }
  };

  // game state functions //////////////////////////////////////////////////////////////////////

  // handleReset
  // will cause App to render NewGameDisplay
  // and also hides the modal, which would be left
  // open if the restart or quit buttons are used
  const handleReset = () => {
    setGameInProgress(false);
    hideModal();
  };

  // handleStartGame
  // resets all game data and inputs player
  // names based on the NewGameDisplay
  const handleStartGame = (playerOptions) => {
    // playerOptions: nested object:
    //    { marks, players}
    //    marks = {p1: "x/o", p2: "o/x"}
    //    players = {p1: "you/p1", p2: "cpu/p2"}

    const newPlayerSettings = { x: null, o: null };
    if (playerOptions.marks.p1 === "x") {
      newPlayerSettings.x = playerOptions.players.p1;
      newPlayerSettings.o = playerOptions.players.p2;
    } else {
      newPlayerSettings.o = playerOptions.players.p1;
      newPlayerSettings.x = playerOptions.players.p2;
    }
    setGameInProgress(true);
    setBoardState(["", "", "", "", "", "", "", "", ""]);
    setScore({ x: 0, o: 0, ties: 0 });
    setTurnMark("x");
    setTurnCount(0);
    setPlayers({ x: newPlayerSettings.x, o: newPlayerSettings.o });
  };

  // handleTurn
  // when a PlaySquare is clicked, it invokes this function
  // and sends its own number (id)
  const handleTurn = (id) => {
    var newBoardState = boardState;
    newBoardState[id] = turnMark;
    setBoardState(newBoardState);
    setTurnCount(turnCount + 1);
    testForWin();
  };

  // handleIncrementScore
  // at the end of a round, increase the score counter
  // for the mark of the winning player (or "ties" if tied)
  const handleIncrementScore = (scoringMark) => {
    const newScore = { x: 0, o: 0, ties: 0 };
    Object.keys(newScore).forEach((mark) => {
      if (mark === scoringMark) {
        newScore[mark] = score[mark] + 1;
      } else {
        newScore[mark] = score[mark];
      }
    });
    setScore(newScore);
  };

  // handleWinner
  // when a winner (or tie) is determined
  const handleWinner = (winnerMark) => {
    setWinnerMark(winnerMark);
    handleIncrementScore(winnerMark);

    let winningPText = "";
    switch (players[winnerMark]) {
      case "cpu":
        winningPText = "oh no, you lost...";
        break;
      case "you":
        winningPText = "you won!";
        break;
      default:
        winningPText = "player " + players[winnerMark][1] + " wins!";
    }

    const pElement = <p>{winningPText}</p>;

    showModal({
      show: true,
      pElement: pElement,
      winIcon:
        winnerMark === "x" ? (
          <img src={iconX} alt="x icon" className="xo-icon" />
        ) : (
          <img src={iconO} alt="o icon" className="xo-icon" />
        ),
      heading: "takes the round",
      hideModalButton: "button2",
      button1Text: "quit",
      button2Text: "next round",
    });
  };

  // testForWin
  // test for win (tie yet to be implemented)
  const testForWin = () => {
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
        boardState[winningLines[i][0]] === boardState[winningLines[i][1]] &&
        boardState[winningLines[i][1]] === boardState[winningLines[i][2]] &&
        boardState[winningLines[i][0]] === turnMark
      ) {
        win = true;
        handleWinner(turnMark);
        return;
      }
      i++;
    }

    if (!win && turnCount === 9) {
      console.log("it's a tie!!!");
    }

    if (turnMark === "x") {
      setTurnMark("o");
    } else {
      setTurnMark("x");
    }
  };

  // display //////////////////////////////////////////////////////////////////////////////
  if (gameInProgress) {
    return (
      <div>
        <BannerModal
          hideModal={hideModal}
          resetFunction={handleReset}
          parameters={modalParameters}
        />
        <GameDisplay
          players={players}
          score={score}
          boardState={boardState}
          handleTurn={handleTurn}
          showModal={showModal}
          resetFunction={handleReset}
          scoreFunction={handleIncrementScore}
          iconX={iconX}
          iconO={iconO}
        />
      </div>
    );
  } else {
    return (
      <NewGameDisplay startGame={handleStartGame} iconX={iconX} iconO={iconO} />
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

export default App;
