import React from "react";
import Hero from "../components/bramy/Hero";
import Embossing from "../components/bramy/Embossing";
import GateColour from "../components/bramy/GateColour";

function page() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <Embossing />
      <GateColour />
    </main>
  );
}

export default page;
