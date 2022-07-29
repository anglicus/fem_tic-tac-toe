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
      {parameters.pElement}
      {parameters.winIcon}
      <h2>{parameters.heading}</h2>
      <Button
        clickFunction={button1Function}
        functionParameters={null}
        colorClass="btn--silver"
        sizeClass="btn--secondary"
        label={parameters.button1Text}
      />
      <Button
        clickFunction={button2Function}
        functionParameters={winnerMark}
        colorClass="btn--yellow"
        sizeClass="btn--secondary"
        label={parameters.button2Text}
      />
    </div>
  );
};

export default BannerModal;
