"use client";

import React, { useState } from "react";
import GarageConfigurator from "./GarageConfigurator";
import GarageViewer from "./GarageViewer";



function Main() {
  const [selectedOptions, setSelectedOptions] = useState({
    color: "Złoty Dąb Jasny",
    colorRal:null,
    width: 7,
    depth: 5,
    height: 213,
    emboss: "wąskie",
    direction: "poziom",

    roof: "dwuspad",
    roofColor: "Antracyt",
    roofColorRal:'#272C38',
    roofType: "blachodachówka",

    gateEmbose: "wąskie",
    gateDirection: "poziom",

    gateCount: 1,
    gateType1: "uchylna",
    gatePositionValue1:300,
    gateColor1: "Złoty Dąb Jasny",
    gateColorRal1:null,
    gateWidth1: 3,
    gateHeight1: 200,
    gatePositionValue1:150,

    gateType2: "uchylna",
    gateColor2: "Złoty Dąb Jasny",
    gateColorRa2:null,
    gateWidth2: 3,
    gateHeight2: 200,
    gatePositionValue2:300,    

    gateType3: "uchylna",
    gateColor3: "Złoty Dąb Jasny",
    gateColorRal3:null,
    gateWidth3: 3,
    gateHeight3: 200,
    gatePositionValue3:600,

    door:[],
    window:[{
      "size": "80x60",
      "position": "przod",
      "positionValue": 50,
  }],

    carport:false,
    carportWidth: 3,
    carportSide: "lewo",
    

  });
  console.log(selectedOptions.window);

  return (
    <div className="bg-slate-200 w-screen h-screen flex">
      <div className="w-full">
        <GarageViewer selectedOptions={selectedOptions} />
      </div>
      <div className=" p-5 w-[600px] bg-slate-300 overflow-auto ">
        <GarageConfigurator selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
        />
      </div>
    </div>
  );
}

export default Main;
