import { useState } from "react";

import NewGameDisplay from "./components/newgamedisplay";
import GameDisplay from "./components/gamedisplay";
import BannerModal from "./components/bannermodal";
import { handleGameLogic } from "./game-logic";

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
    turnMark: "x",
    winnerMark: "",
    showModal: false,
    modalParameters: {},
  });

  const newGameDefaults = {
    newGame: true,
    boardState: ["", "", "", "", "", "", "", "", ""],
    score: { x: 0, o: 0, ties: 0 },
    players: { x: "", o: "" },
    turnMark: "x",
    winnerMark: "",
    showModal: false,
    modalParameters: {},
  };

  // function to copy gameState into a temporary variable //
  const copyGameVars = () => {
    // console.log("**** copyGameVars ****");
    // console.log("----- game state is now", gameState);
    let newGameVars = newGameDefaults;
    newGameVars.newGame = gameState.newGame;
    newGameVars.boardState = gameState.boardState;
    newGameVars.score.x = gameState.score.x;
    newGameVars.score.o = gameState.score.o;
    newGameVars.score.ties = gameState.score.ties;
    newGameVars.players.x = gameState.players.x;
    newGameVars.players.o = gameState.players.o;
    newGameVars.turnMark = gameState.turnMark;
    newGameVars.winnerMark = gameState.winnerMark;
    newGameVars.modalParameters.show = gameState.modalParameters.show;
    // console.log("     #### copyGameVars ####");
    return newGameVars;
  };

  // modal-related functions //////////////////////////////////////////////////////////////////////
  // -- players can only show the modal by choice by clicking the silver restart button
  //    in the upper right corner of the game display, which calls the function showResetModal below
  // -- winning game (or tie) modal is shown automatically by setting the showModal state to "true"
  const showResetModal = (parameters) => {
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

  // -- all modals have a button that serves to simply hide the modal
  //    - reset modal: go back to playing the game
  //    - winning modal: continue another round after clearing the board
  const hideModal = () => {
    const newGameState = copyGameVars();
    newGameState.modalParameters.show = false;

    // when the modal was shown due to a winner, reset the board
    // and return to "x" turn
    if (newGameState.winnerMark !== "") {
      newGameState.winnerMark = "";
      newGameState.turnMark = "x";
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
      turnMark: "x",
      winnerMark: "",
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

  // function handleTurn
  // -- when a PlaySquare is clicked or AI moves, it invokes this function
  //    and sends the current game state and number of the clicked square (id)
  //    out to the handleGameLogic function, which then sends back
  //    a new game state based on the results
  const processMove = (id) => {
    const gameStateCopy = copyGameVars();
    const newGameState = handleGameLogic(gameStateCopy, id);
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
          winIcon={
            gameState.winnerMark !== "" ? (
              gameState.winnerMark === "x" ? (
                <img src={iconX} alt="x-icon" />
              ) : (
                <img src={iconO} alt="o-icon" />
              )
            ) : null
          }
          parameters={gameState.modalParameters}
        />
        <GameDisplay
          players={gameState.players}
          turnMark={gameState.turnMark}
          winnerMark={gameState.winnerMark}
          score={gameState.score}
          boardState={gameState.boardState}
          processMove={processMove}
          showResetModal={showResetModal}
          iconX={iconX}
          iconO={iconO}
        />
      </main>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

export default App;
