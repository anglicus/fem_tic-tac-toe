// button.js

const Button = (props) => {
  return (
    <button
      onClick={() => props.clickFunction(props.functionParameters)}
      className={`btn--global ${props.layoutClass} ${props.colorClass} ${props.sizeClass}`}
    >
      {props.label}
    </button>
  );
};

export default Button;
