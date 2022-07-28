// button.js

import React from "react";

const Button = (props) => {
  return (
    <button
      onClick={() => props.clickFunction(props.functionParameters)}
      className={`btn-global ${props.colorClass} ${props.sizeClass}`}
    >
      {props.label}
    </button>
  );
};

export default Button;
