"use client";

import React, { useState, useEffect, use } from "react";
import GarageConfigurator from "./GarageConfigurator";
import GarageViewer from "./GarageViewer";
import Modal from "./Modal";

function Main() {
  const [selectedOptions, setSelectedOptions] = useState({
    color: "Złoty Dąb Jasny",
    colorRal: null,
    width: 6,
    depth: 6,
    height: 213,
    emboss: "wąskie",
    direction: "poziom",

    roof: "dwuspad",
    roofColor: "Antracyt",
    roofColorRal: "#272C38",
    roofType: "blachodachówka",

    gateEmbose: "wąskie",
    gateDirection: "poziom",

    gateCount: 2,
    gateType1: "uchylna",
    gateColor1: "Złoty Dąb Jasny",
    gateColorRal1: null,
    gateWidth1: 3,
    gateHeight1: 200,
    gatePositionValue1: 150,

    gateType2: "uchylna",
    gateColor2: "Złoty Dąb Jasny",
    gateColorRal2: null,
    gateWidth2: 3,
    gateHeight2: 200,
    gatePositionValue2: 300,

    gateType3: "uchylna",
    gateColor3: "Złoty Dąb Jasny",
    gateColorRal3: null,
    gateWidth3: 3,
    gateHeight3: 200,
    gatePositionValue3: 600,

    door: [],
    window: [],

    carport: false,
    carportWidth: 3,
    carportSide: "lewo",

    gutter: false,
    automatic: false,
    filc: false,
  });
  const [modal, setModal] = useState(false);

  return (
    <div className="bg-slate-200 relative w-screen h-screen flex max-sm:flex-col">
      <Modal selectedOptions={selectedOptions} modal={modal} setModal={setModal} />
      <div className="w-full h-full relative max-sm:h-1/2 ">
        <GarageViewer selectedOptions={selectedOptions} />
        <button
          onClick={() => setModal(true)}
          className="fixed z-50 btn-acel max-sm:py-2 w-full py-5 text-2xl bottom-0 right-0  animate-pulse  bg-slate-900 text-white rounded-md"
        >
          Wyślij wycenę
        </button>
      </div>
      <div className=" p-5 md:w-[600px] h- bg-slate-300 overflow-auto ">
        <GarageConfigurator
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
    </div>
  );
}

export default Main;
