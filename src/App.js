import { useState, useEffect } from "react";

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
  return (
    <div className="play-square" id={"square-" + props.id.toString()}>
      square {props.id}
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////////////////

const BannerModal = ({ show, parameters }) => {
  const showHideClassName = show ? "open" : "closed";
  return (
    <div className={"banner-modal " + showHideClassName}>
      <h2>{parameters.heading}</h2>
      <Button
        clickfunction={parameters.button1Function}
        parameters={null}
        color="btn-silver"
        size="btn-secondary"
        label={parameters.button1Text}
      />
      <Button
        clickfunction={parameters.button2Function}
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
  const [modalOpen, setModalOpen] = useState(false);
  const [roundInProgress, setRoundInProgress] = useState(true);

  const handleRoundEnd = () => {};

  const showModal = () => {
    setModalOpen(true);
  };

  const hideModal = () => {
    setModalOpen(false);
  };

  const resetModalParameters = {
    heading: "restart game?",
    button1Text: "no, cancel",
    button1Function: hideModal,
    button2Text: "yes, restart",
    button2Function: props.resetFunction,
  };

  const playSquares = [];
  for (let i = 1; i < 10; i++) {
    playSquares.push(<PlaySquare key={i} id={i} />);
  }

  return (
    <div>
      <BannerModal show={modalOpen} parameters={resetModalParameters} />
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
          score={props.score.x}
          color="yellow"
        />
      </div>
      <button onClick={() => props.scoreFunction("x")}>score for x</button>
      <button onClick={() => props.scoreFunction("o")}>score for y</button>
      <button onClick={() => props.scoreFunction("ties")}>
        score for ties
      </button>
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
