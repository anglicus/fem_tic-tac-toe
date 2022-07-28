// button.js

import React from "react";

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

export default Button;
