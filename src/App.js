import { useState, useEffect } from "react";

import NewGameDisplay from "./components/newgamedisplay";
import GameDisplay from "./components/gamedisplay";
import BannerModal from "./components/bannermodal";
import { processGameLogic, choiceByXO } from "./game-logic";

import iconX from "./assets/icon-x.svg";
import iconO from "./assets/icon-o.svg";

import "./css/App.css";

///////////////////////////////////////////////////////////////////////////////////////////

function App() {
  // state variable //////////////////////////////////////////////////////////////////////
  const [gameState, setGameState] = useState({
    newGame: true,
    boardState: ["", "", "", "", "", "", "", "", ""],
    score: { x: 0, o: 0, ties: 0 },
    players: { x: null, o: null },
    startingPlayer: "x",
    turnMark: "x",
    winnerMark: "",
    winningLine: [],
    showModal: false,
    modalParameters: {},
  });

  const newGameDefaults = {
    newGame: true,
    boardState: ["", "", "", "", "", "", "", "", ""],
    score: { x: 0, o: 0, ties: 0 },
    players: { x: "", o: "" },
    startingPlayer: "x",
    turnMark: "x",
    winnerMark: "",
    winningLine: [],
    showModal: false,
    modalParameters: {},
  };

  // function to copy gameState into a temporary variable //
  const copyGameVars = () => {
    let newGameVars = newGameDefaults;
    newGameVars.newGame = gameState.newGame;
    newGameVars.boardState = gameState.boardState;
    newGameVars.score.x = gameState.score.x;
    newGameVars.score.o = gameState.score.o;
    newGameVars.score.ties = gameState.score.ties;
    newGameVars.players.x = gameState.players.x;
    newGameVars.players.o = gameState.players.o;
    newGameVars.startingPlayer = gameState.startingPlayer;
    newGameVars.turnMark = gameState.turnMark;
    newGameVars.winnerMark = gameState.winnerMark;
    newGameVars.winningLine = gameState.winningLine;
    newGameVars.showModal = gameState.showModal;
    newGameVars.modalParameters = gameState.modalParameters;
    return newGameVars;
  };

  useEffect(() => {
    let savedState = JSON.parse(window.localStorage.getItem("game-state"));
    console.log("saved state: ", savedState);
    if (savedState) {
      setGameState(savedState);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("game-state", JSON.stringify(gameState));
  }, [gameState]);

  // modal-related functions //////////////////////////////////////////////////////////////////////
  // -- players can only show the modal by choice by clicking the silver restart button
  //    in the upper right corner of the game display, which calls the function showResetModal below
  // -- winning game (or tie) modal is shown automatically by setting the showModal state to "true"
  const showResetModal = () => {
    const newGameState = copyGameVars();
    newGameState.showModal = true;
    newGameState.modalParameters = {
      heading: "restart game?",
      hideModalButton: "button1",
      button1Text: "no, cancel",
      button2Text: "yes, restart",
    };
    setGameState(newGameState);
  };

  // -- if a player wins, this function will be called after a short delay
  //    from the GameDisplay
  const showWinningModal = () => {
    const newGameState = copyGameVars();
    newGameState.showModal = true;
    setGameState(newGameState);
  };

  // -- all modals have a button that serves to simply hide the modal
  //    - reset modal: go back to playing the game
  //    - winning modal: continue another round after clearing the board
  const hideModal = () => {
    const newGameState = copyGameVars();
    newGameState.showModal = false;

    // when the modal was shown due to a winner (or tie), reset the board,
    // swap starting players, and set the turn mark to the starting player
    if (newGameState.winnerMark !== "") {
      newGameState.winnerMark = "";
      newGameState.winningLine = [];
      newGameState.startingPlayer =
        newGameState.startingPlayer === "x" ? "o" : "x";
      newGameState.turnMark = newGameState.startingPlayer;
      newGameState.boardState = ["", "", "", "", "", "", "", "", ""];
    }

    setGameState(newGameState);
  };

  // -- all modals have a button to quit and go back to the beginning screen
  //    - function handleReset is called by this button
  //    - will cause App to render NewGameDisplay
  const resetGame = () => {
    const newGameState = copyGameVars();
    newGameState.newGame = true;
    setGameState(newGameState);
  };

  // other game state functions //////////////////////////////////////////////////////////////////////////
  // function handleStartGame
  // -- resets all game data and inputs player names based on the NewGameDisplay
  const startNewGame = (playerOptions) => {
    // console.log("**** handleStartGame ****");
    // playerOptions: nested object:
    //    { marks, players}
    //    marks = {p1: "x/o", p2: "o/x"}
    //    players = {p1: "you/p1", p2: "cpu/p2"}
    let newGameState = {
      newGame: false,
      boardState: ["", "", "", "", "", "", "", "", ""],
      score: { x: 0, o: 0, ties: 0 },
      players: { x: "", o: "" },
      startingPlayer: "x",
      turnMark: "x",
      winnerMark: "",
      winningLine: [],
      showModal: false,
      modalParameters: {},
    };
    if (playerOptions.marks.p1 === "x") {
      newGameState.players.x = playerOptions.players.p1;
      newGameState.players.o = playerOptions.players.p2;
    } else {
      newGameState.players.o = playerOptions.players.p1;
      newGameState.players.x = playerOptions.players.p2;
    }

    setGameState(newGameState);
  };

  // function processMove
  // -- when a PlaySquare is clicked or AI moves, it invokes this function
  //    and sends the current game state and number of the clicked square (id)
  //    out to the processGameLogic function, which then sends back
  //    a new game state based on the results
  const processMove = (id) => {
    const gameStateCopy = copyGameVars();
    const newGameState = processGameLogic(gameStateCopy, id);
    setGameState(newGameState);
  };

  // display //////////////////////////////////////////////////////////////////////////////
  if (gameState.newGame) {
    return (
      <main className="main">
        <NewGameDisplay startGame={startNewGame} iconX={iconX} iconO={iconO} />
      </main>
    );
  } else {
    return (
      <main className="main">
        <BannerModal
          show={gameState.showModal}
          hideModal={hideModal}
          resetFunction={resetGame}
          winIcon={choiceByXO(
            gameState.winnerMark,
            <img src={iconX} alt="x-icon" />,
            <img src={iconO} alt="o-icon" />,
            null
          )}
          parameters={gameState.modalParameters}
        />
        <GameDisplay
          players={gameState.players}
          turnMark={gameState.turnMark}
          winnerMark={gameState.winnerMark}
          winningLine={gameState.winningLine}
          score={gameState.score}
          boardState={gameState.boardState}
          processMove={processMove}
          showResetModal={showResetModal}
          showWinningModal={showWinningModal}
          modalShown={gameState.showModal}
          iconX={iconX}
          iconO={iconO}
        />
      </main>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

export default App;
