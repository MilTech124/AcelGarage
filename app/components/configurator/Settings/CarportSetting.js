import React from "react";
import { Select, InputLabel, FormControl, MenuItem, Menu } from "@mui/material";
import { variable } from "../Variable";

function CarportSetting({ selectedOptions, setSelectedOptions }) {
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
              <MenuItem value={"tyl"}>Tył</MenuItem>
            </Select>
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
                    <MenuItem value={width}>{width}</MenuItem>
                ))}
            
            </Select>
          </FormControl>
        </>
      )}
    </div>
  );
}

export default CarportSetting;
