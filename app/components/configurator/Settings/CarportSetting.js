import React, { use, useEffect } from "react";
import { Select, InputLabel, FormControl, MenuItem, Menu } from "@mui/material";
import { variable } from "../Variable";
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import Image from "next/image";


function CarportSetting({ selectedOptions, setSelectedOptions }) {
  useEffect(() => {
    if (selectedOptions.carport) {
      toast.success("Dodano wiatę");
    }
  }
  , [selectedOptions.carport]);
  const {carportSides,roof,carportSide} = selectedOptions

  const setCarportSides = (e) => {     
    setSelectedOptions({
      ...selectedOptions,
      carportSides: { ...carportSides, [e.target.name]: !carportSides[e.target.name] }
    });
  };
  
  

  return (
    <div>
      <h4 className="bg-slate-900 p-2">Wiata</h4>
      <div className="flex items-center">
        <img src="/konfigurator/carport.png" className="w-40 h-40" alt="" />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Wiata</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedOptions.carport}
            onChange={(e) => {
              setSelectedOptions({
                ...selectedOptions,
                carport: e.target.value,
              });
            }}
            label="Wiaty"
          >
            <MenuItem value={false}>Nie</MenuItem>
            <MenuItem value={true}>Tak</MenuItem>
          </Select>
        </FormControl>
      </div>

      {selectedOptions.carport && (
        <>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Strona
            </InputLabel>

            {/* KOREKCJA WYBORU STRONY WIATY */}
            {selectedOptions.roof === "spad przód" ? (
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedOptions.carportSide}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    carportSide: e.target.value,
                  });
                }}
                label="Strona"
              >
                <MenuItem value={"lewo"}>Prawo</MenuItem>
                <MenuItem value={"prawo"}>Lewo</MenuItem>
                <MenuItem value={"przod"}>Tył</MenuItem>
                <MenuItem value={"tyl"}>Przód</MenuItem>
              </Select>
            ) : selectedOptions.roof === "spad w lewo" ? (
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedOptions.carportSide}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    carportSide: e.target.value,
                  });
                }}
                label="Strona"
              >
                <MenuItem value={"lewo"}>Przod</MenuItem>
                <MenuItem value={"prawo"}>Tył</MenuItem>
                <MenuItem value={"przod"}>Prawo</MenuItem>
                <MenuItem value={"tyl"}>Lewo</MenuItem>
              </Select>
            ) : selectedOptions.roof === "spad w prawo" ? (
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedOptions.carportSide}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    carportSide: e.target.value,
                  });
                }}
                label="Strona"
              >
                <MenuItem value={"lewo"}>Tył</MenuItem>
                <MenuItem value={"prawo"}>Przod</MenuItem>
                <MenuItem value={"przod"}>Lewo</MenuItem>
                <MenuItem value={"tyl"}>Prawo</MenuItem>
              </Select>
            ) : (
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedOptions.carportSide}
                onChange={(e) => {
                  setSelectedOptions({
                    ...selectedOptions,
                    carportSide: e.target.value,
                  });
                }}
                label="Strona"
              >
                <MenuItem value={"lewo"}>Lewo</MenuItem>
                <MenuItem value={"prawo"}>Prawo</MenuItem>
                <MenuItem value={"przod"}>Przód</MenuItem>
                <MenuItem value={"tyl"}>Tył</MenuItem>/
              </Select>
            )}
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Rozmiar
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedOptions.carportWidth}
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  carportWidth: e.target.value,
                });
              }}
              label="Szerokość"
            >
              {variable.carportWidth.map((width) => (
                <MenuItem key={width} value={width}>
                  {width}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
            Typ Poszycia Wiaty
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedOptions.carportType}
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  carportType: e.target.value,
                });
              }}
              label="Typ Poszycia Wiaty"
            >
              <MenuItem value={"brak"}>Brak</MenuItem>
              <MenuItem value={"Oblachowane"}>Oblachowane</MenuItem>
              <MenuItem value={"Ażury"}>Ażury</MenuItem>
            </Select>
             {/* {selectedOptions.carportType === "brak" ? (
              <></>
            ) : selectedOptions.carportType === "Oblachowane" ? (
              <Image className="pt-2"  src="/konfigurator/blacha.jpg" width={500} height={300} alt="" />
            ) : (
              <Image className="pt-2"  src="/konfigurator/azury.jpg" width={500} height={300} alt="" />
            )
              } */}
          
          </FormControl>
          {(selectedOptions.carport  && !(selectedOptions.carportType==="brak") ) && (
        <div className="flex flex-col items-center justify-center bg-slate-400 rounded-md p-2 ">      
          <p className="text-slate-700">Wybierz scianę do oblachowania</p>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Button size="small" className="w-5" disabled={((roof==="dwuspad" || roof==="spad tyl") && carportSide==="przod") } variant={selectedOptions.carportSides.przod ? "contained":"outlined"} name="przod" onClick={(e) => setCarportSides(e)}>__</Button>
          </FormControl>
          <div className="flex">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Button className="w-5" disabled={((roof==="dwuspad" || roof==="spad tyl") && carportSide==="prawo") } variant={selectedOptions.carportSides.lewo ? "contained":"outlined"} name="lewo" onClick={(e) => setCarportSides(e)} >|</Button>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Button className="w-5" disabled={((roof==="dwuspad" || roof==="spad tyl") && carportSide==="lewo") } variant={selectedOptions.carportSides.prawo ? "contained":"outlined"} name="prawo" onClick={(e) => setCarportSides(e)} >|</Button>
            </FormControl>
          </div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Button className="w-5" disabled={((roof==="dwuspad" || roof==="spad tyl") && carportSide==="tyl") } variant={selectedOptions.carportSides.tyl ? "contained":"outlined"} name="tyl" onClick={(e) => setCarportSides(e)} >__</Button>
            </FormControl>
      </div>
      )
        }
        </>
      )}
    </div>
  );
}

export default CarportSetting;
