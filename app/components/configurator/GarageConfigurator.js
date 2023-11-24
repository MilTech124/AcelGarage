import React, { useState } from "react";
import MainGarage from "./MainGarage";
import TypeGarage from "./TypeGarage";
import RoofSetting from "./RoofSetting";
import GateSetting from "./GateSetting";
import GateSetting2 from "./GateSetting2";
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
      <RoofSetting 
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <GateSetting2
         selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </>
  );
};

export default GarageConfigurator;
