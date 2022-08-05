// playsquare.js

import React from "react";

import iconX from "../assets/icon-x.svg";
import iconO from "../assets/icon-o.svg";
import iconXOutline from "../assets/icon-x-outline.svg";
import iconOOutline from "../assets/icon-o-outline.svg";

import { choiceByXO } from "../game-logic";

const PlaySquare = (props) => {
  const urlStrX = "URL(" + iconX + ")";
  const urlStrO = "URL(" + iconO + ")";
  const maskImgX = { maskImage: urlStrX };
  const maskImgO = { maskImage: urlStrO };

  const imgElement = choiceByXO(
    props.mark,
    <img src={iconX} alt="x icon" />,
    <img src={iconO} alt="o icon" />,
    null
  );

  const maskElement = choiceByXO(
    props.mark,
    <div className="play-square__winmask winmask" style={maskImgX}></div>,
    <div className="play-square__winmask winmask" style={maskImgO}></div>,
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
      {props.winning !== "" ? maskElement : null}
    </div>
  );
};

export default PlaySquare;
