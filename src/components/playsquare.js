// playsquare.js

import React from "react";

import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";
import iconXOutline from "../assets/icon-x-outline.svg";
import iconOOutline from "../assets/icon-o-outline.svg";

import { choiceByXO } from "../game-logic";

const PlaySquare = (props) => {
  const imgElement = choiceByXO(
    props.mark,
    <img src={iconX} alt="x icon" />,
    <img src={iconO} alt="o icon" />,
    null
  );

  const winClass = choiceByXO(props.winning, " winning-x", " winning-o", "");

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
        "play-square play-square--" +
        (props.mark === "" ? "empty" : "marked") +
        winClass
      }
      id={"square-" + props.id.toString()}
      onClick={() => {
        props.clickfunction(props.id);
      }}
    >
      {imgElement}
      {outlineElement}
      {props.winning !== "" ? <span className="winmask"></span> : null}
    </div>
  );
};

export default PlaySquare;
