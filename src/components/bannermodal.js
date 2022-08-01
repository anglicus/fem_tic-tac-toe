// bannermodal.js

import React from "react";
import Button from "./button";

const BannerModal = ({ hideModal, resetFunction, winnerMark, parameters }) => {
  const showHideClassName = parameters.show ? "open" : "closed";
  var button1Function;
  var button2Function;
  if (parameters.hideModalButton === "button1") {
    button1Function = hideModal;
    button2Function = resetFunction;
  } else {
    button2Function = hideModal;
    button1Function = resetFunction;
  }

  return (
    <div className={"banner-modal " + showHideClassName}>
      <div className={"banner-modal__banner"}>
        {parameters.pElement}
        <div className="banner-modal__heading-div">
          {parameters.winIcon}
          <h2
            className={
              "banner-modal__heading " +
              (winnerMark === "x"
                ? "x-win"
                : winnerMark === "o"
                ? "o-win"
                : "reset")
            }
          >
            {parameters.heading}
          </h2>
        </div>
        <div className="banner-modal__button-div">
          <Button
            clickFunction={button1Function}
            functionParameters={null}
            colorClass="btn--silver"
            sizeClass="btn--secondary"
            layoutClass="banner-modal__button"
            label={parameters.button1Text}
          />
          <Button
            clickFunction={button2Function}
            functionParameters={winnerMark}
            colorClass="btn--yellow"
            sizeClass="btn--secondary"
            layoutClass="banner-modal__button"
            label={parameters.button2Text}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerModal;
