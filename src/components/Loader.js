import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="modal__overlay">
      <div className="modal__container">
        <TailSpin heigth="100" width="100" color="grey" ariaLabel="loading" />
      </div>
    </div>
  );
};

export default Loader;
