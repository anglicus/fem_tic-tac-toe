// playsquare.js

import React from "react";

import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";
import iconXOutline from "../assets/icon-x-outline.svg";
import iconOOutline from "../assets/icon-o-outline.svg";

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

  const outlineElement =
    props.turnMark === "x" ? (
      <img
        src={iconXOutline}
        className="play-square__outline"
        alt="x icon outline"
      />
    ) : (
      <img
        src={iconOOutline}
        className="play-square__outline"
        alt="o icon outline"
      />
    );
  return (
    <div
      className={
        "play-square play-square--" + (props.mark === "" ? "empty" : "marked")
      }
      id={"square-" + props.id.toString()}
      onClick={() => {
        props.clickfunction(props.id);
      }}
    >
      {imgElement}
      {outlineElement}
    </div>
  );
};

export default PlaySquare;
