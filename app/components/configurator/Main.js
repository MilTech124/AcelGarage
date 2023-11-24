"use client";

import React, { useState } from "react";
import GarageConfigurator from "./GarageConfigurator";
import GarageViewer from "./GarageViewer";

function Main() {
  const [selectedOptions, setSelectedOptions] = useState({
    color: "Złoty Dąb Jasny",
    width: 6,
    depth: 5,
    height: 213,
    emboss: "wąskie",

    roof: "dwuspad",
    roofColor: "Antracyt",
    roofType: "blachodachówka",

    gateEmbose: "wąskie",
    gateDirection: "poziom",

    gateCount: 1,
    gateType1: "uchylna",
    gatePositionValue1:300,
    gateColor1: "Złoty Dąb Jasny",
    gateWidth1: 3,
    gateHeight1: 200,
    gatePositionValue1:150,

    gateType2: "uchylna",
    gateColor2: "Złoty Dąb Jasny",
    gateWidth2: 3,
    gateHeight2: 200,
    gatePositionValue2:300,    

    gateType3: "uchylna",
    gateColor3: "Złoty Dąb Jasny",
    gateWidth3: 3,
    gateHeight3: 200,
    gatePositionValue3:700,

  });

  return (
    <div className="bg-slate-200 w-screen h-screen flex">
      <div className="w-full">
        <GarageViewer selectedOptions={selectedOptions} />{" "}
      </div>
      <div className=" p-5 w-[600px] bg-slate-300 overflow-auto ">
        <GarageConfigurator selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
        />
      </div>
    </div>
  );
}

export default Main;
