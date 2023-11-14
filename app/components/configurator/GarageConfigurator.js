import React, { useState } from "react";
import MainGarage from "./MainGarage";
import TypeGarage from "./TypeGarage";
// importuj inne selektory

const GarageConfigurator = ({ selectedOptions, setSelectedOptions }) => {
  return (
    <>
      <TypeGarage
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <MainGarage
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </>
  );
};

export default GarageConfigurator;
