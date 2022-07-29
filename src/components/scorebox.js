// scorebox.js

import React from "react";

const ScoreBox = (props) => {
  return (
    <div className={`score-box ${props.colorClass}`}>
      <p>{props.player}</p>
      <p>{props.score}</p>
    </div>
  );
};

export default ScoreBox;
