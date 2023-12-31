import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { OrbitControls,ContactShadows } from "@react-three/drei";
import { Model } from "./Model";

function GarageViewer({selectedOptions}) {

  // renderowanie modelu 3D z wykorzystaniem selectedOptions
  return (
    <Canvas camera={{ position: [20, 5, 5], fov: 25 }}>
      <OrbitControls />
      {/* <ambientLight intensity={0.5} /> */}
      <directionalLight position={[20, 20, 5]} intensity={1} />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={1}
        opacity={0.75}
      />

      <Model selectedOptions={selectedOptions} />
      <Environment preset="city"   />
    </Canvas>
  );
}

export default GarageViewer;
