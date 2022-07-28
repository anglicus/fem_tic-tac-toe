// bannermodal.js

import React from "react";
import Button from "./button";

const BannerModal = ({ show, hideModal, resetFunction, parameters }) => {
  const showHideClassName = show ? "open" : "closed";
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
      <h2>{parameters.heading}</h2>
      <Button
        clickfunction={button1Function}
        parameters={null}
        color="btn-silver"
        size="btn-secondary"
        label={parameters.button1Text}
      />
      <Button
        clickfunction={button2Function}
        parameters={null}
        color="btn-yellow"
        size="btn-secondary"
        label={parameters.button2Text}
      />
    </div>
  );
};

export default BannerModal;
