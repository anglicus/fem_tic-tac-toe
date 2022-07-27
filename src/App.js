import { useState, useEffect } from "react";
import iconX from "./assets/icon-x.svg";
import iconO from "./assets/icon-o.svg";

import "./css/app.css";

///////////////////////////////////////////////////////////////////////////////////////////

const Button = (props) => {
  return (
    <button
      onClick={() => props.clickfunction(props.parameters)}
      className={`btn-global ${props.color} ${props.size}`}
    >
      {props.label}
    </button>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////

const ScoreBox = (props) => {
  return (
    <div className={"score-box " + props.color}>
      <p>{props.player}</p>
      <p>{props.score}</p>
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////

const PlaySquare = (props) => {
  const imgElement =
    props.mark !== "" ? (
      props.mark === "x" ? (
        <img src={iconX} />
      ) : (
        <img src={iconO} />
      )
    ) : (
      <span></span>
    );
  return (
    <div
      className="play-square"
      id={"square-" + props.id.toString()}
      onClick={() => {
        props.clickfunction(props.id);
      }}
    >
      {imgElement}
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////

const BannerModal = ({ show, hideModal, resetFunction, parameters }) => {
  const showHideClassName = show ? "open" : "closed";
  var button1Function;
  var button2Function;
  if (parameters.hideModalButton === "button1") {
    button1Function = hideModal;
    button2Function = resetFunction;
  } else {
    button2Function = hideModal;
    button1Function = resetFunction;
  }

  return (
    <div className={"banner-modal " + showHideClassName}>
      <h2>{parameters.heading}</h2>
      <Button
        clickfunction={button1Function}
        parameters={null}
        color="btn-silver"
        size="btn-secondary"
        label={parameters.button1Text}
      />
      <Button
        clickfunction={button2Function}
        parameters={null}
        color="btn-yellow"
        size="btn-secondary"
        label={parameters.button2Text}
      />
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////

const NewGameDisplay = (props) => {
  const [mark, setMark] = useState("x");

  const updateOptions = (e) => {
    if (e.target.checked) {
      setMark("o");
    } else {
      setMark("x");
    }
  };

  return (
    <div className="newgame-display">
      <div className="newgame-display__icons">
        <img src="assets/icon-x.svg" alt="x-icon" className="xo-icon" />
        <img src="assets/icon-o.svg" alt="o-icon" className="xo-icon" />
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
          clickfunction={props.startGame}
          parameters={{ p1: mark, p2: "cpu" }}
          color="btn-yellow"
          size="btn-primary"
          label="new game (vs cpu)"
        />
        <Button
          clickfunction={props.startGame}
          parameters={{ p1: mark, p2: "p2" }}
          color="btn-blue"
          size="btn-primary"
          label="new game (vs player)"
        />
      </div>
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParameters, setModalParameters] = useState({
    pText: null,
    heading: "restart game?",
    hideModalButton: "button1",
    button1Text: "no, cancel",
    button2Text: "yes, restart",
  });

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
    // reset modal to the restart button style
    // whenever it is closed
    setModalParameters({
      pText: null,
      heading: "restart game?",
      hideModalButton: "button1",
      button1Text: "no, cancel",
      button2Text: "yes, restart",
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
    setModalParameters({
      pText: "someone won",
      heading: "takes the round",
      hideModalButton: "button2",
      button1Text: "quit",
      button2Text: "next round",
    });
    showModal();
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
        show={modalOpen}
        hideModal={hideModal}
        resetFunction={props.resetFunction}
        parameters={modalParameters}
      />
      <div className="game-display">
        <div className="game-display__icons">xo</div>
        <div className="game-display__turn-display">turn</div>
        <Button
          clickfunction={showModal} // {props.resetFunction}
          parameters={null}
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

///////////////////////////////////////////////////////////////////////////////////////////

function App() {
  const [gameInProgress, setGameInProgress] = useState(false);
  const [score, setScore] = useState({ x: 0, o: 0, ties: 0 });
  const [players, setPlayers] = useState({ x: null, o: null });

  const handleReset = () => {
    setGameInProgress(false);
  };

  const handleStartGame = (playerOptions) => {
    // playerOptions: object with p1 and p2 properties
    // that can be one of three values: x, cpu or p2

    const newPlayerSettings = { x: null, o: null };
    if (playerOptions.p1 === "x") {
      newPlayerSettings.x = "p1";
      newPlayerSettings.o = playerOptions.p2;
    } else {
      newPlayerSettings.o = "p1";
      newPlayerSettings.x = playerOptions.p2;
    }
    setGameInProgress(true);
    setScore({ x: 0, o: 0, ties: 0 });
    setPlayers({ x: newPlayerSettings.x, o: newPlayerSettings.o });
  };

  const handleIncrementScore = (scoringMark) => {
    console.log("old score was:", score);
    const newScore = { x: 0, o: 0, ties: 0 };
    Object.keys(newScore).forEach((mark) => {
      if (mark === scoringMark) {
        newScore[mark] = score[mark] + 1;
      } else {
        newScore[mark] = score[mark];
      }
    });
    console.log("new score is:", newScore);
    setScore(newScore);
  };

  if (gameInProgress) {
    return (
      <GameDisplay
        players={players}
        score={score}
        resetFunction={handleReset}
        scoreFunction={handleIncrementScore}
      />
    );
  } else {
    return <NewGameDisplay startGame={handleStartGame} />;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

export default App;
