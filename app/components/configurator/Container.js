"use client";

import React, { useState } from "react";
import GarageConfigurator from "./GarageConfigurator";
import GarageViewer from "./GarageViewer";

function Container() {
  const [selectedOptions, setSelectedOptions] = useState({
    color: "Złoty Dąb Jasny",
    width: 3,
    depth: 3,
    height: 213,
    emboss: "wąskie",
    roof: "dwuspad",
  });

  return (
    <div className="bg-slate-200 w-screen h-screen flex">
      <div className="w-full">
        <GarageViewer selectedOptions={selectedOptions} />{" "}
      </div>
      <div className=" p-5 w-[600px] bg-slate-300">
        <GarageConfigurator selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}
        />
      </div>
    </div>
  );
}

export default Container;
