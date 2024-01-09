import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";

function Materials(selectedOptions) {


  const {
    roofColorRal,
    roofType,
    color,
    colorRal,
    emboss,
    direction,
    gateDirection,
    gateEmbose,
    gateColorRal1,
    gateColor1,
    gateColorRal2,
    gateColor2,
    gateColorRal3,
    gateColor3,
    door,
  } = selectedOptions;

  //helpers
  const mainColor = () => {
    let wallMaterial;
    if (colorRal === null || colorRal === undefined) {
      wallMaterial = new MeshStandardMaterial({
        map:
          color === "Złoty Dąb Jasny"
            ? wallTexture
            : color === "Złoty Dąb Ciemny"
            ? wallTextureDabDark
            : wallTextureOrzech,
        normalMap: direction === "poziom" ? normalWall : normalwall90,
        roughness: 0.8,
        metalness: 1,
      });
    } else {
      wallMaterial = new MeshStandardMaterial({
        color: colorRal,
        normalMap: direction === "poziom" ? normalWall : normalwall90,
        roughness: 0.9,
        metalness: 0.2,
      });
    }
    return wallMaterial;
  };

  const gateColor = (num) => {
    let gateMaterial;
    if (num === 1) {
      if (gateColorRal1 === null || gateColorRal1 === undefined) {
        gateMaterial = new MeshStandardMaterial({
          map:
            gateColor1 === "Złoty Dąb Jasny"
              ? wallTexture
              : gateColor1 === "Złoty Dąb Ciemny"
              ? wallTextureDabDark
              : wallTextureOrzech,
          normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
          roughness: 0.8,
          metalness: 1,
        });
      } else {
        gateMaterial = new MeshStandardMaterial({
          color: gateColorRal1,
          normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
          roughness: 0.9,
          metalness: 0.2,
        });
      }
    } else if (num === 2) {
      if (gateColorRal2 === null || gateColorRal2 === undefined) {
        gateMaterial = new MeshStandardMaterial({
          map:
            gateColor2 === "Złoty Dąb Jasny"
              ? wallTexture
              : gateColor2 === "Złoty Dąb Ciemny"
              ? wallTextureDabDark
              : wallTextureOrzech,
          normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
          roughness: 0.8,
          metalness: 1,
        });
      } else {
        gateMaterial = new MeshStandardMaterial({
          color: gateColorRal2,
          normalMap: gateDirection === "poziom" ? normalGate : normalwall90,
          roughness: 0.9,
          metalness: 0.2,
        });
      }
    } else if (num === 3) {
      if (gateColorRal3 === null || gateColorRal3 === undefined) {
        gateMaterial = new MeshStandardMaterial({
          map:
            gateColor3 === "Złoty Dąb Jasny"
              ? wallTexture
              : gateColor3 === "Złoty Dąb Ciemny"
              ? wallTextureDabDark
              : wallTextureOrzech,
          normalMap: gateDirection === "poziom" ? normalWall : normalGate90,
          roughness: 0.8,
          metalness: 1,
        });
      } else {
        gateMaterial = new MeshStandardMaterial({
          color: gateColorRal3,
          normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
          roughness: 0.9,
          metalness: 0.2,
        });
      }
    }
    return gateMaterial;
  };
  
  const doorNumber = (num) => {
    const doorItem = door.find((door, index) => index === num);    
    return doorItem;
  };

  const doorColor = (num) => {
    let doorMaterial;  
    if(door.length >= 1){
    doorNumber(num);
   
    const curentDoor = doorNumber(num);  
    const colorRal = curentDoor.colorRal ? curentDoor.colorRal:null;
    const color = curentDoor.color?curentDoor.color:null;
    if (colorRal === null || colorRal === undefined) {
      doorMaterial = new MeshStandardMaterial({
        map:
          color === "Złoty Dąb Jasny"
            ? wallTexture
            : color === "Złoty Dąb Ciemny"
            ? wallTextureDabDark
            : wallTextureOrzech,
        normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
        roughness: 0.8,
        metalness: 1,
      });
    } else {
      doorMaterial = new MeshStandardMaterial({
        color: colorRal,
        normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
        roughness: 0.9,
        metalness: 0.2,
      });
    }
    return doorMaterial;
  }
  };

  //textures loader
  const roofTexture = useLoader(TextureLoader, "/model/roof.jpg");
  const roofTrapezTexture = useLoader(TextureLoader, "/model/trapez2.jpg");

  const wallTexture = useLoader(TextureLoader, "/model/jasny-dab-2.jpg");
  const wallTextureDabDark = useLoader(TextureLoader, "/model/dab-2.jpg");
  const wallTextureOrzech = useLoader(TextureLoader, "/model/orzech-2.jpg");
  const normalWall = useLoader(TextureLoader, "/model/normal-big-90.jpg");
  const normalwall90 = useLoader(TextureLoader, "/model/normal-big.jpg");

  const gateTexture = useLoader(TextureLoader, "/model/jasny-dab-2.jpg");
  const normalGate = useLoader(TextureLoader, "/model/normal-big-90-gate.jpg");
  const normalGate90 = useLoader(TextureLoader, "/model/normal-big-gate.jpg");

 

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

  wallTextureDabDark.repeat.set(1, 1);
  wallTextureDabDark.wrapS = THREE.RepeatWrapping;
  wallTextureDabDark.wrapT = THREE.RepeatWrapping;

  wallTextureOrzech.repeat.set(1, 1);
  wallTextureOrzech.wrapS = THREE.RepeatWrapping;
  wallTextureOrzech.wrapT = THREE.RepeatWrapping;

  normalWall.repeat.set(1, emboss === "wąskie" ? 5.2 : 3.2);
  normalWall.wrapS = THREE.RepeatWrapping;
  normalWall.wrapT = THREE.RepeatWrapping;

  normalwall90.repeat.set(emboss === "wąskie" ? 16 : 10, 1);
  normalwall90.wrapS = THREE.RepeatWrapping;
  normalwall90.wrapT = THREE.RepeatWrapping;

  gateTexture.repeat.set(1, 1);
  gateTexture.wrapS = THREE.RepeatWrapping;
  gateTexture.wrapT = THREE.RepeatWrapping;

  normalGate.repeat.set(1, gateEmbose === "wąskie" ? 5.2 : 3,1);
  normalGate.wrapS = THREE.RepeatWrapping;
  normalGate.wrapT = THREE.RepeatWrapping;

  normalGate90.repeat.set(gateEmbose === "wąskie" ? 5.2 : 3, 1);
  normalGate90.wrapS = THREE.RepeatWrapping;
  normalGate90.wrapT = THREE.RepeatWrapping;

  //materials
  const roofMaterial = new MeshStandardMaterial({
    map: roofType === "blachodachówka" ? null : roofTrapezTexture,
    normalMap: roofType === "blachodachówka" ? roofTexture : roofTrapezTexture,
    color: roofColorRal,
    roughness: roofType === "blachodachówka" ? 0.9 : 0.9,
    metalness: roofType === "blachodachówka" ? 0.1 : 0.4,
    bumpMap: roofType === "blachodachówka" ? roofTexture : roofTrapezTexture,
  });

  const wallMaterial = mainColor();
  const gateMaterial1 = gateColor(1);
  const gateMaterial2 = gateColor(2);
  const gateMaterial3 = gateColor(3);
  const doorMaterial1 = doorColor(0);


  return {
    roofMaterial,
    wallMaterial,
    gateMaterial1,
    gateMaterial2,
    gateMaterial3,
    doorMaterial1,  

  };
}

export default Materials;
