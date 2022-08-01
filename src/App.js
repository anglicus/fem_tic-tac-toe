import { useState } from "react";

import NewGameDisplay from "./components/newgamedisplay";
import GameDisplay from "./components/gamedisplay";
import BannerModal from "./components/bannermodal";

import iconX from "./assets/icon-x.svg";
import iconO from "./assets/icon-o.svg";

import "./css/app.css";

///////////////////////////////////////////////////////////////////////////////////////////

function App() {
  // state variable //////////////////////////////////////////////////////////////////////
  const [gameState, setGameState] = useState({
    newGame: true,
    boardState: ["", "", "", "", "", "", "", "", ""],
    score: { x: 0, o: 0, ties: 0 },
    players: { x: null, o: null },
    turnMark: "x",
    winnerMark: "",
    modalParameters: { show: false },
  });

  // stateless variable to be used in between renderings for game logic
  let gameVars = {
    newGame: true,
    boardState: ["", "", "", "", "", "", "", "", ""],
    score: { x: 0, o: 0, ties: 0 },
    players: { x: "", o: "" },
    turnMark: "x",
    winnerMark: "",
    modalParameters: { show: false },
  };

  // function to copy gameState into gameVars //
  const copyGameVars = () => {
    console.log("**** copyGameVars ****");
    console.log("----- game state is now", gameState);
    let newGameVars = {};
    newGameVars.newGame = gameState.newGame;
    newGameVars.boardState = gameState.boardState;
    newGameVars.score = gameState.score;
    newGameVars.players = gameState.players;
    newGameVars.turnMark = gameState.turnMark;
    newGameVars.winnerMark = gameState.winnerMark;
    newGameVars.modalParameters = gameState.modalParameters;
    console.log("     #### copyGameVars ####");
    return newGameVars;
  };

  // modal functions //////////////////////////////////////////////////////////////////////
  const showModal = (parameters) => {
    gameVars = copyGameVars();
    gameVars.modalParameters = parameters;
    updateGame();
  };

  const hideModal = () => {
    console.log("**** hideModal ****");
    console.log("----- game state is now", gameState);
    console.log("----- game vars", gameVars);
    gameVars = copyGameVars();
    gameVars.modalParameters.show = false;

    // when the modal was shown due to a winner, reset the board
    // and return to "x" turn
    if (gameVars.winnerMark !== "") {
      console.log("----- clearing out since there was a winner");
      gameVars.winnerMark = "";
      gameVars.turnMark = "x";
      gameVars.boardState = ["", "", "", "", "", "", "", "", ""];
    }

    updateGame();
  };

  // AI functions //////////////////////////////////////////////////////////////////////////////
  const handleAIMove = () => {
    console.log("**** handleAIMove ****");
    console.log("----- game state is now", gameState);
    console.log("----- board state is", gameVars.boardState);
    console.log(
      "----- turn is",
      gameVars.turnMark,
      " played by ",
      gameVars.players[gameVars.turnMark]
    );

    let emptySquares = [];
    for (let i = 0; i < 9; i++) {
      console.log("----- checking", i);
      if (gameVars.boardState[i] === "") {
        console.log("----- pushing", i);
        emptySquares.push(i);
      }
    }
    console.log("----- emptySquares:", emptySquares);
    let chosenSquare = Math.floor(Math.random() * emptySquares.length);
    handleTurn(emptySquares[chosenSquare]);
    console.log("     #### handleAIMove ####");
  };

  // game state functions //////////////////////////////////////////////////////////////////////

  // handleReset
  // will cause App to render NewGameDisplay
  const handleReset = () => {
    gameVars = copyGameVars();
    gameVars.newGame = true;
    setGameState(gameVars);
  };

  // sets new game state based on any changes
  // and checks if it's an AI turn or human turn
  const updateGame = () => {
    console.log("**** updateGame ****");
    console.log("----- game state is now", gameState);
    console.log("----- updating with gameVars: ", gameVars);
    setGameState(gameVars);
    if (
      gameVars.players[gameVars.turnMark] === "cpu" &&
      gameVars.winnerMark === ""
    ) {
      handleAIMove();
    }
    console.log("     #### updateGame ####");
  };

  // handleStartGame
  // resets all game data and inputs player
  // names based on the NewGameDisplay
  const handleStartGame = (playerOptions) => {
    console.log("**** handleStartGame ****");
    // playerOptions: nested object:
    //    { marks, players}
    //    marks = {p1: "x/o", p2: "o/x"}
    //    players = {p1: "you/p1", p2: "cpu/p2"}
    if (playerOptions.marks.p1 === "x") {
      gameVars.players.x = playerOptions.players.p1;
      gameVars.players.o = playerOptions.players.p2;
    } else {
      gameVars.players.o = playerOptions.players.p1;
      gameVars.players.x = playerOptions.players.p2;
    }
    gameVars.newGame = false;
    gameVars.boardState = ["", "", "", "", "", "", "", "", ""];
    gameVars.score = { x: 0, o: 0, ties: 0 };
    gameVars.turnMark = "x";
    /*
    setNewGame(false);
    setBoardState(["", "", "", "", "", "", "", "", ""]);
    setScore({ x: 0, o: 0, ties: 0 });
    setTurnMark("x");
    setPlayers({ x: gameVars.players.x, o: gameVars.players.o });
    */
    console.log("----- initial game vars", gameVars);
    updateGame();
    /*
    if (gameVars.players.x === "cpu") {
      console.log("preparing for AI move from handleStartGame");
      handleAIMove();
    }
    */
  };

  // handleTurn
  // when a PlaySquare is clicked or AI moves, it invokes this function
  // and sends the number of the clicked square (id)
  const handleTurn = (id) => {
    console.log("**** handleTurn ****");
    console.log(
      "----- player with mark",
      gameVars.turnMark,
      "clicked square",
      id
    );
    console.log("----- game state is now", gameState);
    if (gameVars.players[gameVars.turnMark] !== "cpu") {
      gameVars = copyGameVars();
    }
    gameVars.boardState[id] = gameVars.turnMark;
    console.log("----- handling turn of", gameVars.turnMark);
    console.log("----- with board state:", gameVars.boardState);
    console.log("----- with players", gameVars.players);
    // setBoardState(gameVars.boardState);
    testForWin();
    updateGame();
    console.log("     #### handleTurn ####");
  };

  // handleWinner
  // when a winner ("x", "o" or "ties") is determined, increase that mark's score
  // and show the model with appropriate information
  const handleWinner = (winnerMark) => {
    gameVars.winnerMark = winnerMark;
    let oldScore = gameVars.score[winnerMark];
    gameVars.score[winnerMark] = oldScore + 1;

    let winningPElement;
    let winningHeading = "";
    let winningIcon;

    if (winnerMark !== "ties") {
      switch (gameVars.players[winnerMark]) {
        case "cpu":
          winningPElement = (
            <p className="banner-modal__msg">oh no, you lost...</p>
          );
          break;
        case "you":
          winningPElement = <p className="banner-modal__msg">you won!</p>;
          break;
        default:
          winningPElement = (
            <p>player {gameVars.players[winnerMark][1]} wins!</p>
          );
      }

      winningHeading = "takes the round";
      winningIcon =
        winnerMark === "x" ? (
          <img src={iconX} alt="x icon" className="xo-icon" />
        ) : (
          <img src={iconO} alt="o icon" className="xo-icon" />
        );
    } else {
      winningHeading = "round tied";
    }

    gameVars.modalParameters = {
      show: true,
      pElement: winningPElement,
      winIcon: winningIcon,
      heading: winningHeading,
      hideModalButton: "button2",
      button1Text: "quit",
      button2Text: "next round",
    };
  };

  // testForWin
  // test for win (tie yet to be implemented)
  const testForWin = () => {
    console.log("**** testForWin ****");
    // find how many turns have been taken based on empty spaces
    let turnCount =
      9 -
      gameVars.boardState.filter((square) => {
        return square === "";
      }).length;

    // if at least 3 turns haven't been taken, just skip this step
    if (turnCount > 3) {
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
          gameVars.boardState[winningLines[i][0]] ===
            gameVars.boardState[winningLines[i][1]] &&
          gameVars.boardState[winningLines[i][1]] ===
            gameVars.boardState[winningLines[i][2]] &&
          gameVars.boardState[winningLines[i][0]] === gameVars.turnMark
        ) {
          win = true;
          handleWinner(gameVars.turnMark);
          return;
        }
        i++;
      }
    }

    // if a win wasn't encountered above, but 9 turns have been taken then it must be a tie
    if (turnCount === 9) {
      handleWinner("ties");
      return;
    }

    // if there was no win, switch the turn mark
    if (gameVars.turnMark === "x") {
      gameVars.turnMark = "o";
    } else {
      gameVars.turnMark = "x";
    }
    console.log("     #### testForWin ####");
  };

  // display //////////////////////////////////////////////////////////////////////////////
  if (gameState.newGame) {
    return (
      <main className="main">
        <NewGameDisplay
          startGame={handleStartGame}
          iconX={iconX}
          iconO={iconO}
        />
      </main>
    );
  } else {
    return (
      <main className="main">
        <BannerModal
          hideModal={hideModal}
          resetFunction={handleReset}
          winnerMark={gameState.winnerMark}
          parameters={gameState.modalParameters}
        />
        <GameDisplay
          players={gameState.players}
          turnMark={gameState.turnMark}
          score={gameState.score}
          boardState={gameState.boardState}
          handleTurn={handleTurn}
          showModal={showModal}
          iconX={iconX}
          iconO={iconO}
        />
      </main>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

export default App;
