// scorebox.js

const ScoreBox = (props) => {
  return (
    <div className={`score-box ${props.colorClass} ${props.layoutClass}`}>
      <p className="score-box__player">{props.player}</p>
      <p className="score-box__score heading-m">{props.score}</p>
    </div>
  );
};

export default ScoreBox;
