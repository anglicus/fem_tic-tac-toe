// playsquare.js

import React from "react";

import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";

const PlaySquare = (props) => {
  const imgElement =
    props.mark !== "" ? (
      props.mark === "x" ? (
        <img src={iconX} alt="x icon" />
      ) : (
        <img src={iconO} alt="o icon" />
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

export default PlaySquare;
