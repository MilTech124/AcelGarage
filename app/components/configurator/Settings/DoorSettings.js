import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Slider,
} from "@mui/material";
import { variable } from "../Variable";

function DoorSettings({ selectedOptions, setSelectedOptions }) {
  const [countDoor, setCountDoor] = useState(0);
  const { width, depth, height } = selectedOptions;

  const handleChange = (prop) => (event) => {
    setSelectedOptions({ ...selectedOptions, [prop]: event.target.value });
  };

  const handleDoor = (action) => {
    if (action === "+" && countDoor < 5) {
      setCountDoor(countDoor + 1);
      const newDoor = new door("100x190", "lewe", "Złoty Dąb Jasny");
      setSelectedOptions({
        ...selectedOptions,
        door: [...selectedOptions.door, newDoor],
      });
      console.log(selectedOptions.door);
      toast.success("Dodano drzwi");
    } else if (action === "-" && countDoor > 0) {
      setCountDoor(countDoor - 1);
      setSelectedOptions({
        ...selectedOptions,
        door: selectedOptions.door.slice(0, -1),
      });
      toast.error("Usunięto drzwi");
    }
  };

  function door(size, type, color) {
    this.size = size;
    this.type = type;
    this.color = color;
    this.position = "lewo";
    this.positionValue = 0;
  }

  return (
    <div>
      <h4 className="bg-slate-900 p-2 mt-5">Dodatkowe drzwi</h4>
      <div className="flex justify-around">
        <figure>
          {" "}
          <img className="w-20 pt-5" src="./konfigurator/door.png" />
        </figure>
        <div className="  flex flex-col justify-center items-center">
          <p className="text-2xl font-bold">{countDoor}</p>
          <div className="flex gap-2">
            <button
              className="bg-slate-900 text-white px-2 py-1 rounded-md"
              onClick={() => handleDoor("-")}
            >
              -
            </button>
            <button
              className="bg-slate-900 text-white px-2 py-1 rounded-md"
              onClick={() => handleDoor("+")}
            >
              +
            </button>
          </div>

          <div></div>
        </div>
      </div>

      <div className="flex flex-col  gap-2">
        {selectedOptions.door.map((door, index) => (
          <div className="flex flex-wrap gap-2 justify-between p-2 mt-2 bg-slate-200">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Drzwi
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={door.size}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    door: selectedOptions.door.map((item, i) =>
                      i === index ? { ...item, size: e.target.value } : item
                    ),
                  });
                }}
                label="Drzwi"
              >
                {variable.doorSize.map((size) => (
                  <MenuItem value={size}>{size}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Typ
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={door.type}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    door: selectedOptions.door.map((item, i) =>
                      i === index ? { ...item, type: e.target.value } : item
                    ),
                  });
                }}
                label="Typ"
              >
                {variable.doorType.map((type) => (
                  <MenuItem value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex w-full justify-between">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Kolor
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={door.color}
                  onChange={(e) => {
                    setSelectedOptions({
                      ...selectedOptions,
                      door: selectedOptions.door.map((item, i) =>
                        i === index ? { ...item, color: e.target.value } : item
                      ),
                    });
                  }}
                  label="Kolor"
                >
                  {variable.dooorColors.map((color) => (
                    <MenuItem value={color}>{color}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Pozycja
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={door.position}
                  onChange={(e) => {
                    setSelectedOptions({
                      ...selectedOptions,
                      door: selectedOptions.door.map((item, i) =>
                        i === index
                          ? { ...item, position: e.target.value }
                          : item
                      ),
                    });
                  }}
                  label="Pozycja"
                >
                  {variable.doorPosition.map((position) => (
                    <MenuItem value={position}>{position}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 350 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Pozycja
              </InputLabel>             
              <Slider
                value={door.positionValue}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    door: selectedOptions.door.map((item, i) =>
                      i === index
                        ? { ...item, positionValue: e.target.value }
                        : item
                    ),
                  });
                }}
                min={0}
                max={
                  door.position === "przod" || door.position === "tył"
                    ? depth * 100 - 100
                    : width * 100 - 100
                }
                step={10}
                aria-label="Default"
                valueLabelDisplay="auto"
              />
            </FormControl>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoorSettings;
