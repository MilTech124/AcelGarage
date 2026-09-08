import { Suspense } from "react";
import { Canvas, extend, useThree } from '@react-three/fiber'
import { Environment } from "@react-three/drei";
import { OrbitControls, ContactShadows, Html } from "@react-three/drei";
import { Model } from "./Model";
import Dimensions from "./Dimensions";
import { useRef, useEffect, useState } from "react";


function CaptureScreenshot({ setCaptureFunction,capture }) {
  const { gl } = useThree();

  useEffect(() => {
    if (capture){
      const capture = () => {
        const imageData = gl.domElement.toDataURL('image/png');
        console.log(imageData);
        return imageData;
      };
       setCaptureFunction(capture())

    }


  },[capture])

  return null;
}



function GarageViewer({ selectedOptions ,captureScreenshot,capture }) {

  const canvasRef = useRef();
  const [wymiary, setWymiary] = useState(false);

  /*
    R3F montuje scenę dopiero wtedy, gdy zmierzy swój kontener na więcej niż 0 px
    (react-use-measure + ResizeObserver). Jeśli strona wystartuje w tle - karta
    otwarta "w nowej zakładce", przełączony pulpit, telefon z wygaszonym ekranem -
    pomiar potrafi zostać na zerze i scena nigdy nie rusza: zostaje sam kafelkowany
    placeholder albo wieczne "Ładowanie modelu…".
    Rozpoznajemy taki martwy stan po tym, że kontener ma już realny rozmiar, a bufor
    canvasa nadal ma domyślne 300x150 (czyli WebGLRenderer nigdy nie dostał setSize),
    i przemontowujemy <Canvas> - świeży pomiar wykonuje się na gotowym layoucie.
  */
  const wrapRef = useRef(null);
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    let proby = 0;
    const sprawdz = () => {
      const wrap = wrapRef.current;
      const canvas = wrap && wrap.querySelector("canvas");
      if (!wrap || !canvas || proby >= 10) return;
      const martwy =
        wrap.clientWidth > 0 &&
        wrap.clientHeight > 0 &&
        canvas.width <= 300 &&
        canvas.height <= 150;
      if (martwy) {
        proby += 1;
        setMountKey((k) => k + 1);
      }
    };
    const id = setInterval(sprawdz, 1000);
    document.addEventListener("visibilitychange", sprawdz);
    window.addEventListener("resize", sprawdz);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", sprawdz);
      window.removeEventListener("resize", sprawdz);
    };
  }, []);

  return (

    <div className="relative w-full h-full" ref={wrapRef}>

    {/* Przełącznik miarek - lewa krawędź viewera, lustrzanie do karty presetu po prawej */}
    <button
      type="button"
      onClick={() => setWymiary((w) => !w)}
      aria-pressed={wymiary}
      title={wymiary ? "Ukryj wymiary" : "Pokaż wymiary"}
      className={`flex flex-col items-center gap-1 cursor-pointer p-2 rounded-r-md absolute left-0 top-2 z-10 transition-colors ${
        wymiary
          ? "bg-slate-900 text-white hover:bg-slate-700"
          : "bg-slate-400 text-slate-900 hover:bg-slate-300"
      }`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="8" width="20" height="8" rx="1" />
        <path d="M6 8v4M10 8v3M14 8v4M18 8v3" />
      </svg>
      <p className="text-xs">Wymiary</p>
    </button>

    <Canvas key={mountKey} gl={{ preserveDrawingBuffer: true }}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      camera={{ position: [20, 5, 5], fov: 25,}}
      style={{
        background: "url(/logo-black.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "50% 50%",
      }}
    >

      <CaptureScreenshot setCaptureFunction={captureScreenshot} capture={capture} />
      <OrbitControls
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={15} // minimum zoom level
        maxDistance={30} // maximum zoom level
      />
      {/* <ambientLight intensity={0.5} /> */}
      <directionalLight position={[20, 20, 5]} intensity={2} />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={1}
        opacity={0.75}
      />


      {/* Granica Suspense MUSI być wewnątrz <Canvas>: bez niej r3f rzuca na zewnątrz
          obietnicę, która nigdy się nie rozwiązuje (Block), kontener zostaje schowany,
          useMeasure mierzy 0x0 i scena już nigdy się nie renderuje. */}
      <Suspense
        fallback={
          <Html center>
            <span className="text-slate-600 text-sm whitespace-nowrap">
              Ładowanie modelu…
            </span>
          </Html>
        }
      >
        <Model selectedOptions={selectedOptions} />
      </Suspense>

      {/* Miarki poza granicą Suspense modelu: nie czekają na GLB, liczą się z samych
          wymiarów, więc nie mają jak zablokować sceny. */}
      {wymiary && <Dimensions selectedOptions={selectedOptions} />}

      {/* Environment MUSI mieć własną granicę: to tylko mapa odbić, którą drei
          ściąga z cudzego CDN (raw.githack.com, ~1,5 MB). We wspólnej granicy
          z modelem wolny, zablokowany albo wiszący HDR trzymał cały garaż
          niewidoczny - stąd "czasem model się nie pokazuje". */}
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </Canvas>

    </div>

  );
}

export default GarageViewer;
