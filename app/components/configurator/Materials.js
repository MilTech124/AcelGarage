import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";
import { DoubleSide } from 'three'


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
    gateType1,
    gateType2,
    gateType3,
    door,
    height,
    width,
    metalWorkColorWall,
    metalWorkColorWallRal,
    metalWorkColorRoof,
    carportType,
    carportWidth
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
        side:DoubleSide
      });
    } else {
      wallMaterial = new MeshStandardMaterial({
        color: colorRal,
        normalMap: direction === "poziom" ? normalWall : normalwall90,
        roughness: 0.9,
        metalness: 0.2,
        side:DoubleSide
      });
    }
    return wallMaterial;
  };

  const gateColor = (num) => {
    let gateMaterial;

    if (num === 1) {
      if (gateType1 != "segmentowa") {
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
      } else {
        if (gateColorRal1 === null || gateColorRal1 === undefined) {
          gateMaterial = new MeshStandardMaterial({
            map:
              gateColor1 === "Złoty Dąb Jasny"
                ? wallTexture
                : gateColor1 === "Złoty Dąb Ciemny"
                ? wallTextureDabDark
                : wallTextureOrzech,
            normalMap: gateSegment,
            roughness: 0.8,
            metalness: 1,
          });
        } else {
          gateMaterial = new MeshStandardMaterial({
            color:gateColorRal1,
            normalMap: gateSegment,
            roughness: 0.9,
            metalness: 0.2,
          });
          return gateMaterial;
        }
      }
    } else if (num === 2) {
      if (gateType2 != "segmentowa") {
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
            normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
            roughness: 0.9,
            metalness: 0.2,
          });
        }
      } else {
        if (gateColorRal2 === null || gateColorRal2 === undefined) {
          gateMaterial = new MeshStandardMaterial({
            map:
              gateColor2 === "Złoty Dąb Jasny"
                ? wallTexture
                : gateColor2 === "Złoty Dąb Ciemny"
                ? wallTextureDabDark
                : wallTextureOrzech,
            normalMap: gateSegment,
            roughness: 0.8,
            metalness: 1,
          });
        } else {
          gateMaterial = new MeshStandardMaterial({
            color:gateColorRal2,
            normalMap: gateSegment,
            roughness: 0.9,
            metalness: 0.2,
          });
          return gateMaterial;
        }
      }
    } else if (num === 3) {
      if (gateType3 != "segmentowa") {
        if (gateColorRal3 === null || gateColorRal3 === undefined) {
          gateMaterial = new MeshStandardMaterial({
            map:
              gateColor3 === "Złoty Dąb Jasny"
                ? wallTexture
                : gateColor3 === "Złoty Dąb Ciemny"
                ? wallTextureDabDark
                : wallTextureOrzech,
            normalMap: gateDirection === "poziom" ? normalGate : normalGate90,
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
      } else {
        if (gateColorRal3 === null || gateColorRal3 === undefined) {
          gateMaterial = new MeshStandardMaterial({
            map:
              gateColor3 === "Złoty Dąb Jasny"
                ? wallTexture
                : gateColor3 === "Złoty Dąb Ciemny"
                ? wallTextureDabDark
                : wallTextureOrzech,
            normalMap: gateSegment,
            roughness: 0.8,
            metalness: 1,
          });
        } else {
          gateMaterial = new MeshStandardMaterial({
            color:gateColorRal3,
            normalMap: gateSegment,
            roughness: 0.9,
            metalness: 0.2,
          });
          return gateMaterial;
        }
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
    if (door.length >= 1) {
      doorNumber(num);

      const curentDoor = doorNumber(num);
      const colorRal = curentDoor.colorRal ? curentDoor.colorRal : null;
      const color = curentDoor.color ? curentDoor.color : null;
      
      const normalDoor = normalGate.clone(); //copy normalGate
      const normalDoor90 = normalGate90.clone(); //copy normalGate
      let normalMap = curentDoor.direction === "poziom" ? normalDoor : normalDoor90;
      curentDoor.direction === "poziom" 
        ? normalMap.repeat.set(1, curentDoor.embosse === "wąskie" ? 5.2 : 3) 
        : normalMap.repeat.set( curentDoor.embosse === "wąskie" ?  5.2 : 3, 1);;

      if (colorRal === null || colorRal === undefined) {
        doorMaterial = new MeshStandardMaterial({
          map:
            color === "Złoty Dąb Jasny"
              ? wallTexture
              : color === "Złoty Dąb Ciemny"
              ? wallTextureDabDark
              : wallTextureOrzech,
          normalMap: normalMap,
          roughness: 0.8,
          metalness: 1,
        });
      } else {
        doorMaterial = new MeshStandardMaterial({
          color: colorRal,
          normalMap: normalMap,
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

  const azuryTexture = useLoader(TextureLoader, "/model/azury2.png");
  const alphatexture = useLoader(TextureLoader, "/model/alpha-azury2.png");

  const wallTexture = useLoader(TextureLoader, "/model/jasny-dab-2.jpg");
  const wallTextureDabDark = useLoader(TextureLoader, "/model/dab-2.jpg");
  const wallTextureOrzech = useLoader(TextureLoader, "/model/orzech-2.jpg");
  const normalWall = useLoader(TextureLoader, "/model/normal-big-90.jpg");
  const normalwall90 = useLoader(TextureLoader, "/model/normal-big.jpg");

  const gateTexture = useLoader(TextureLoader, "/model/jasny-dab-2.jpg");
  const normalGate = useLoader(TextureLoader, "/model/normal-big-90-gate.jpg");
  const normalGate90 = useLoader(TextureLoader, "/model/normal-big-gate.jpg");
  const gateSegment = useLoader(TextureLoader, "/model/segmentowa.jpg");

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

  normalWall.repeat.set(
    1,
    emboss === "wąskie" ? 6 * (height / 213) : 3.5 * (height / 213)
  );
  normalWall.wrapS = THREE.RepeatWrapping;
  normalWall.wrapT = THREE.RepeatWrapping;

  normalwall90.repeat.set(
    emboss === "wąskie" ? (11 * width) / 6 : (6 * width) / 6,
    1
  );
  normalwall90.wrapS = THREE.RepeatWrapping;
  normalwall90.wrapT = THREE.RepeatWrapping;

  const normalwall90Copy = normalwall90.clone(); //copy normalwall90
  normalwall90Copy.repeat.set(
    emboss === "wąskie" ? ((11 * width) / 6 + carportWidth*0.8) : ((6 * width) / 6)+ carportWidth*0.8,
    1
  );
  normalwall90Copy.wrapS = THREE.RepeatWrapping;
  normalwall90Copy.wrapT = THREE.RepeatWrapping;

 


  gateTexture.repeat.set(1, 1);
  gateTexture.wrapS = THREE.RepeatWrapping;
  gateTexture.wrapT = THREE.RepeatWrapping;

  gateSegment.repeat.set(1, 2);
  gateSegment.wrapS = THREE.RepeatWrapping;
  gateSegment.wrapT = THREE.RepeatWrapping;

  normalGate.repeat.set(1, gateEmbose === "wąskie" ? 5.2 : 3, 1);
  normalGate.wrapS = THREE.RepeatWrapping;
  normalGate.wrapT = THREE.RepeatWrapping;

  normalGate90.repeat.set(gateEmbose === "wąskie" ? 5.2 : 3, 1);
  normalGate90.wrapS = THREE.RepeatWrapping;
  normalGate90.wrapT = THREE.RepeatWrapping;

  alphatexture.repeat.set(1, 1);
  alphatexture.wrapS = THREE.RepeatWrapping;
  alphatexture.wrapT = THREE.RepeatWrapping;

  //materials
  const roofMaterial = new MeshStandardMaterial({
    map: roofType === "blachodachówka" ? null : roofTrapezTexture,
    normalMap: roofType === "blachodachówka" ? roofTexture : roofTrapezTexture,
    color: roofColorRal,
    roughness: roofType === "blachodachówka" ? 0.9 : 0.9,
    metalness: roofType === "blachodachówka" ? 0.6 : 0.4,
    bumpMap: roofType === "blachodachówka" ? roofTexture : roofTrapezTexture,
  });

  const metalWallMaterialFunc = ()=>{
    let wallMetal;
   
    if (metalWorkColorWallRal === null || metalWorkColorWallRal === undefined) {
      wallMetal = new MeshStandardMaterial({
        map:
        metalWorkColorWall === "Złoty Dąb Jasny"
            ? wallTexture
            : metalWorkColorWall === "Złoty Dąb Ciemny"
            ? wallTextureDabDark
            : wallTextureOrzech,
        // normalMap: direction === "poziom" ? normalWall : normalwall90,
        roughness: 0.8,
        metalness: 1,
      });
    } else {
      wallMetal = new MeshStandardMaterial({
        color: metalWorkColorWallRal,
        // normalMap: direction === "poziom" ? normalWall : normalwall90,
        roughness: 0.9,
        metalness: 0.2,
      });
    }
    return wallMetal;
  }
  
    
 

  const metalRoofWorksMaterial = new MeshStandardMaterial({
    // map: wallTexture,
    // normalMap: normalWall,
    color: metalWorkColorRoof,
    roughness: 0.9,
    metalness: 0.6,
    // bumpMap: normalWall,
  });

  const azuryMaterialChose = () => {
    console.log(carportType);
    
    let material;
    if (carportType==="Ażury"){
      if (colorRal === null || colorRal === undefined)  {
        material = new MeshStandardMaterial({
          map:          
          color === "Złoty Dąb Jasny"
          ? wallTexture
          // : color === "Złoty Dąb Ciemny"
          // ? wallTextureDabDark
          : color === "Orzech"
          ? wallTextureOrzech    
          : null,
          alphaMap: alphatexture,
          color: colorRal,
          roughness: 0.8,        
          metalness: 1,
          bumpScale: -1,  
          transparent: true,
          side:DoubleSide
        });
      } else {
        material = new MeshStandardMaterial({
          color: colorRal,
          alphaMap: alphatexture,
          color: colorRal,
          roughness: 0.9,        
          metalness: .2,
          bumpScale: -1,  
          transparent: true,
          side:DoubleSide   
        });
      }  
      return material
    }
    if (carportType ==="Oblachowane"){
      return mainColor()
     } 
     if (carportType ==="mix"){
      if (colorRal === null || colorRal === undefined)  {
        material = new MeshStandardMaterial({
          map:
          
          color === "Złoty Dąb Jasny"
          ? wallTexture
          // : color === "Złoty Dąb Ciemny"
          // ? wallTextureDabDark
          : color === "Orzech"
          ? wallTextureOrzech    
          : null,
          alphaMap: alphatexture,
          color: colorRal,
          roughness: 0.8,        
          metalness: 1,
          bumpScale: -1,  
          transparent: true,
          side:DoubleSide
        });
      } else {
        material = new MeshStandardMaterial({
          color: colorRal,
          alphaMap: alphatexture,
          color: colorRal,
          roughness: 0.9,        
          metalness: .2,
          bumpScale: -1,  
          transparent: true,
          side:DoubleSide   
        });
      }  
  
      return {material1:mainColor() ,material2:material}
     }
  }

  const wallMaterial = mainColor();
  const gateMaterial1 = gateColor(1);
  const gateMaterial2 = gateColor(2);
  const gateMaterial3 = gateColor(3);
  const azuryMaterial = azuryMaterialChose();
  const metalWallMaterial = metalWallMaterialFunc();


  let doorMaterial1;
  let doorMaterial2;
  let doorMaterial3;
  let doorMaterial4;
  doorMaterial1 = door.length >= 1 ? doorColor(0) : doorMaterial1;
  doorMaterial2 = door.length >= 2 ? doorColor(1) : doorMaterial2;
  doorMaterial3 = door.length >= 3 ? doorColor(2) : doorMaterial3;
  doorMaterial4 = door.length >= 4 ? doorColor(3) : doorMaterial4;



  const wallMaterialCopy = wallMaterial.clone();
  wallMaterialCopy.normalMap = wallMaterial.normalMap.clone(); // Tworzy kopię mapy
  wallMaterialCopy.normalMap=  direction === "poziom" ? normalWall: normalwall90Copy;
  
  // normalMap: direction === "poziom" ? normalWall : normalwall90,


  return {
    roofMaterial,
    wallMaterial,
    gateMaterial1,
    gateMaterial2,
    gateMaterial3,
    doorMaterial1,
    doorMaterial2,
    doorMaterial3,
    doorMaterial4,
    metalWallMaterial,
    metalRoofWorksMaterial,
    azuryMaterial, 
    wallMaterialCopy  
  };
}

export default Materials;
