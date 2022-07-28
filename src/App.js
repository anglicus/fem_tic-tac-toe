import { useState } from "react";

import NewGameDisplay from "./components/newgamedisplay";
import GameDisplay from "./components/gamedisplay";

import "./css/app.css";

///////////////////////////////////////////////////////////////////////////////////////////

function App() {
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

  const handleReset = () => {
    setGameInProgress(false);
  };

  const handleStartGame = (playerOptions) => {
    // playerOptions: object with p1 and p2 properties
    // that can be one of three values: x, cpu or p2

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
