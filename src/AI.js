// AI.js

// function analyzeLine
// - determines how many x and o marks the line contains
//   and where any empty squares are in that line
//   returns object { x: <int>, o: <int>, empty: [<int>]}
function analyzeLine(boardState, line) {
  let xCount = 0;
  let oCount = 0;
  let empties = [];
  for (let i = 0; i < 3; i++) {
    if (boardState[line[i]] === "") {
      empties.push(line[i]);
    } else {
      boardState[line[i]] === "x" ? xCount++ : oCount++;
    }
  }
  return { x: xCount, o: oCount, empty: empties };
}

// function decideAIMove
// - weights squares based on strategic considerations
//   but also adds in some randomness to make the game more "human"
function decideAIMove(boardState, AIMark) {
  // if the AI has the first turn, take a random move
  if (boardState.filter((square) => square === "").length === 9) {
    return Math.floor(Math.random() * 9);
  }

  // if the AI has the last turn, just take the only available move
  if (boardState.filter((square) => square === "").length === 1) {
    for (let i = 0; i < 9; i++) {
      if (boardState[i] === "") {
        return i;
      }
    }
  }

  // constants to weight decisions
  const CAN_WIN = 100;
  const CAN_BLOCK_WIN = 90;
  const CAN_MAKE_TWO = 20;
  const CAN_BLOCK_THREE = 10;

  // constants to modify AI intelligence
  const FUZZ_FACTOR = 50; // square priorities can vary by +/- this number
  const FLUB_CHANCE = 15; // 1/this = chance of using the FLUB_FACTOR instead of FUZZ_FACTOR
  const FLUB_FACTOR = 500; // square priorities vary by +/- this number if FLUB_CHANCE allows

  // sequences which can win
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

  // - all squares in this object are given a priority
  // - priority is judged as follows:
  //      can win the game: 100
  //      can block the other player's win: 90
  //      can form two in a row: 20
  //      can stop other player from getting two in a row: 10
  // - priorities are cumulative
  const movePriorities = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };

  // - Analyze the lines and prioritize the moves
  for (let i = 0; i < winningLines.length; i++) {
    let lineStatus = analyzeLine(boardState, winningLines[i]);

    // does the AI have 2/3 on this line?
    if (lineStatus[AIMark] === 2 && lineStatus.empty.length === 1) {
      movePriorities[lineStatus.empty[0]] += CAN_WIN;
    }

    // does the opponent have 2/3 on this line?
    if (lineStatus[AIMark] === 0 && lineStatus.empty.length === 1) {
      movePriorities[lineStatus.empty[0]] += CAN_BLOCK_WIN;
    }

    // can the AI get 2/3 in this line? (i.e. it has one AI mark and two empty)
    if (lineStatus[AIMark] === 1 && lineStatus.empty.length === 2) {
      movePriorities[lineStatus.empty[0]] += CAN_MAKE_TWO;
      movePriorities[lineStatus.empty[1]] += CAN_MAKE_TWO;
    }

    // can the AI block another player from getting three in this line?
    // (i.e. opponent has one mark and two empty)
    if (lineStatus[AIMark] === 0 && lineStatus.empty.length === 2) {
      movePriorities[lineStatus.empty[0]] += CAN_BLOCK_THREE;
      movePriorities[lineStatus.empty[1]] += CAN_BLOCK_THREE;
    }
  }

  // and randomness for a little unpredictability
  let fuzziness = FUZZ_FACTOR;
  if (Math.random() < 1 / FLUB_CHANCE) {
    fuzziness = FLUB_FACTOR;
  }

  for (let square in movePriorities) {
    if (movePriorities[square] > 0) {
      let shift = Math.random() * 2 * fuzziness - fuzziness;
      // don't let any priorities fall to zero or below
      movePriorities[square] = Math.max(movePriorities[square] + shift, 0.1);
    }
  }

  let bestMove = { move: -1, priority: 0 };
  for (let i = 0; i < 9; i++) {
    if (movePriorities[i] > bestMove.priority) {
      bestMove.move = i;
      bestMove.priority = movePriorities[i];
    }
  }

  return bestMove.move;
}

export { decideAIMove };
