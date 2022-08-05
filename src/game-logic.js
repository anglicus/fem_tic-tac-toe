// game-logic.js

// function choiceByXO
// a helper function: checks if a mark is either "x" or "o" or neither and returns
// the appropriate result -- this is to deal with the fact that
// sometimes the mark might be neither ("" or "ties"), and double ternaries can
// be a little awkward
function choiceByXO(mark, xResult, oResult, nResult) {
  if (mark === "x") return xResult;
  if (mark === "o") return oResult;
  return nResult;
}

// funtion testForWin
//  returns { win: true/false, winnerMark: "x/o/ties"}
function testForWin(boardState, turnMark) {
  // find how many turns have been taken based on empty spaces
  let turnCount =
    9 -
    boardState.filter((square) => {
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
    while (i < winningLines.length) {
      if (
        boardState[winningLines[i][0]] === boardState[winningLines[i][1]] &&
        boardState[winningLines[i][1]] === boardState[winningLines[i][2]] &&
        boardState[winningLines[i][0]] === turnMark
      ) {
        return { win: true, winnerMark: turnMark, line: winningLines[i] };
      }
      i++;
    }
  }

  // if a win wasn't encountered above, but 9 turns have been taken then it must be a tie
  if (turnCount === 9) {
    return { win: true, winnerMark: "ties", line: [] };
  }

  // otherwise, there is no win
  return { win: false, winnerMark: "", line: [] };

  // console.log("     #### testForWin ####");
}

function setWinnerParameters(players, winnerMark) {
  let winningPElement;
  let winningHeading = "";
  let winningIcon;

  if (winnerMark !== "ties") {
    switch (players[winnerMark]) {
      case "cpu":
        winningPElement = (
          <p className="banner-modal__msg">oh no, you lost...</p>
        );
        break;
      case "you":
        winningPElement = <p className="banner-modal__msg">you won!</p>;
        break;
      default:
        winningPElement = <p>player {players[winnerMark][1]} wins!</p>;
    }

    winningHeading = "takes the round";
    winningIcon =
      winnerMark === "x"
        ? `<img src={iconX} alt="x icon" className="xo-icon" />`
        : `<img src={iconO} alt="o icon" className="xo-icon" />`;
  } else {
    winningHeading = "round tied";
  }

  let modalParameters = {
    pElement: winningPElement,
    winnerMark: winnerMark,
    winIcon: winningIcon,
    heading: winningHeading,
    hideModalButton: "button2",
    button1Text: "quit",
    button2Text: "next round",
  };

  return modalParameters;
}

// function processGameLogic
// -- main function which accepts the current game state and a new move,
//    then checks for win conditions, and sends back updated game state
function processGameLogic(gameVars, moveID) {
  gameVars.boardState[moveID] = gameVars.turnMark;
  let winCheck = testForWin(gameVars.boardState, gameVars.turnMark);
  // winCheck: {win: bool, winnerMark: "x/o/ties", line: [int, int, int]}
  if (winCheck.win) {
    /// change score
    gameVars.score[winCheck.winnerMark] += 1;
    gameVars.winnerMark = winCheck.winnerMark;
    gameVars.winningLine = winCheck.line;
    // set the modal parameters
    gameVars.modalParameters = setWinnerParameters(
      gameVars.players,
      winCheck.winnerMark
    );
  } else {
    // alternate the turn
    gameVars.turnMark = gameVars.turnMark === "x" ? "o" : "x";
  }
  return gameVars;
}

export { processGameLogic };
export { choiceByXO };
