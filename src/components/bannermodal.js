// bannermodal.js

import React from "react";
import Button from "./button";
/*
hideModal,
resetFunction,
winnerMark,
winIcon,
parameters,
*/

const BannerModal = (props) => {
  const showHideClassName = props.show ? "open" : "closed";
  var button1Function;
  var button2Function;
  if (props.parameters.hideModalButton === "button1") {
    button1Function = props.hideModal;
    button2Function = props.resetFunction;
  } else {
    button2Function = props.hideModal;
    button1Function = props.resetFunction;
  }

  return (
    <div className={"banner-modal " + showHideClassName}>
      <div className={"banner-modal__banner"}>
        {props.parameters.pMessage === "" ? null : (
          <p className="banner-modal__msg heading-xs">
            {props.parameters.pMessage}
          </p>
        )}
        <div className="banner-modal__heading-div">
          {props.winIcon}
          <h2
            className={
              "banner-modal__heading " +
              (props.parameters.winnerMark === "x"
                ? "x-win"
                : props.parameters.winnerMark === "o"
                ? "o-win"
                : "reset")
            }
          >
            {props.parameters.heading}
          </h2>
        </div>
        <div className="banner-modal__button-div">
          <Button
            clickFunction={button1Function}
            functionParameters={null}
            colorClass="btn--silver"
            sizeClass="btn--secondary"
            layoutClass="banner-modal__button"
            label={props.parameters.button1Text}
          />
          <Button
            clickFunction={button2Function}
            functionParameters={props.winnerMark}
            colorClass="btn--yellow"
            sizeClass="btn--secondary"
            layoutClass="banner-modal__button"
            label={props.parameters.button2Text}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerModal;
