import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MeshStandardMaterial } from "three";
import * as THREE from "three"



 function Materials(selectedOptions) {
  console.log(selectedOptions);

  const {roofColorRal,roofType,color,emboss} = selectedOptions;

  //textures loader
  const roofTexture = useLoader(TextureLoader, "/model/roof.jpg");
  const roofTrapezTexture = useLoader(TextureLoader, "/model/trapez2.jpg");
  const wallTexture = useLoader(TextureLoader, "/model/dab-2.webp");  
  const normalSmall = useLoader(TextureLoader, "/model/normal-small-90.jpg");

  //textures uv
  roofTexture.repeat.set(1.5, 1.5);
  roofTexture.wrapS = THREE.RepeatWrapping;
  roofTexture.wrapT = THREE.RepeatWrapping; 

  roofTrapezTexture.repeat.set(1.8, 1);
  roofTrapezTexture.wrapS = THREE.RepeatWrapping;
  roofTrapezTexture.wrapT = THREE.RepeatWrapping;

  wallTexture.repeat.set(1, 1);
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;

  normalSmall.repeat.set(1, emboss === "wąskie" ? 1.8 : 1.2);
  normalSmall.wrapS = THREE.RepeatWrapping;
  normalSmall.wrapT = THREE.RepeatWrapping;


  //materials
  const roofMaterial = new MeshStandardMaterial({
    map: roofType === "blachodachówka" ? null : roofTrapezTexture,  
    normalMap: roofType === "blachodachówka" ? roofTexture : roofTrapezTexture,
    color: roofColorRal,
    roughness: roofType === "blachodachówka" ? 0.8 : 0.9,
    metalness: 0.1,    
    bumpMap: roofType === "blachodachówka" ? roofTexture : roofTrapezTexture,
  });

  const wallMaterial = new MeshStandardMaterial({
    map: wallTexture,   
    bumpMap: normalSmall,
    bumpScale: 1,
    // color: "red",
    normalMap: normalSmall,
    roughness: 0.8,
    metalness: 0.5,  
    
   
  });




  return  {roofMaterial,wallMaterial}
  
}

export default Materials;
 

