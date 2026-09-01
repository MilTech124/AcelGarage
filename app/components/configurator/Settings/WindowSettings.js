
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Slider,
} from "@mui/material";
import { variable } from "../Variable";

function WindowSettings({ selectedOptions, setSelectedOptions }) {
  const [countWindow, setCountWindow] = useState(0);
  const { width, depth } = selectedOptions;

  // Okna we wnęce mają własną sekcję (panel "Wnęka").
  const naWnece = (el) => String(el.position).startsWith("wnęka");
  const oknaZewnetrzne = selectedOptions.window.filter((o) => !naWnece(o));


  const handleSliderChange = (prop) => (event, newValue) => {
    setSelectedOptions({ ...selectedOptions, [prop]: newValue });
  };
  const handleWindow = (action) => {
    if (action === "+") {
      const newWindow = new window("80x60");
      setSelectedOptions({
        ...selectedOptions,
        window: [...selectedOptions.window, newWindow],
      });
      toast.success("Dodano okno");
    } else if (action === "-" && oknaZewnetrzne.length > 0) {
      // kasujemy ostatnie okno ZE ŚCIANY, żeby nie zabrać tych z wnęki
      const ostatnie = selectedOptions.window.reduce(
        (akum, o, i) => (naWnece(o) ? akum : i),
        -1
      );
      setSelectedOptions({
        ...selectedOptions,
        window: selectedOptions.window.filter((_, i) => i !== ostatnie),
      });
      toast.error("Usunięto okno");
    }
  };

  function window(size) {
    this.size = size;
    this.position = "lewo";
    this.positionValue = 0;
  }

  return (
    <div>
      <h4 className="bg-slate-900 p-2 mt-5">Dodatkowe okno</h4>
      <div className="flex justify-around">
        <figure>          
          <img className="w-20 pt-5" src="./konfigurator/window.png" />
        </figure>
        <div className="  flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">{oknaZewnetrzne.length}</p>
          <div className="flex gap-2">
            <button
              className="bg-slate-900 text-white px-2 py-1 rounded-md"
              onClick={() => handleWindow("-")}
            >
              -
            </button>
            <button
              className="bg-slate-900 text-white px-2 py-1 rounded-md"
              onClick={() => handleWindow("+")}
            >
              +
            </button>
          </div>
        </div>
        <div></div>
      </div>
      {selectedOptions.window
        .map((window, index) => ({ window, index }))
        .filter(({ window }) => !naWnece(window))
        .map(({ window, index }) => (
        <div className="bg-slate-200 mb-4 py-2" key={index}>
          <FormControl  sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Okno {index + 1}
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={window.size}
              label="Okno"
              // onChange={handleChange(`window.size`)}
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  window: selectedOptions.window.map((window, i) =>
                    i === index ? { ...window, size: e.target.value } : window
                  ),
                });
              }}
            >
              {variable.windowSize.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Pozycja
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={window.position}
              label="Pozycja"
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  window: selectedOptions.window.map((window, i) =>
                    i === index
                      ? { ...window, position: e.target.value }
                      : window
                  ),
                });
              }}
            >
              {variable.windowPosition.map((position) => (
                <MenuItem key={position} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl  variant="standard" sx={{ m: 1, minWidth:350 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Pozycja
            </InputLabel>
            <Slider
              value={window.positionValue}
              className=""
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  window: selectedOptions.window.map((item, i) =>
                    i === index
                      ? { ...item, positionValue: e.target.value }
                      : item
                  ),
                });
              }}
              min={0}
              max={
                window.position === "przod" || window.position === "tył"
                  ? width * 100 - 100
                  : depth * 100 - 100
              }
              step={10}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </FormControl>
        </div>
      ))}
    </div>
  );
}

export default WindowSettings;
