"use client";
import React, { useState } from "react";
import Garage from "../Garage";
import { Fade } from "react-awesome-reveal";

function Gates({ data }) {
  const [currentFilter, setCurrentFilter] = useState("wszystkie");
  const filters = ["wszystkie", "uchylna", "dwuskrzydłowa", "furtka"];
  console.log(data);

  const Filtered = () => {
    if (currentFilter === "wszystkie") {
      return data;
    } else if (currentFilter === "uchylna") {
      return data.filter((item) => item.acf.kategoria === "uchylna");
    } else if (currentFilter === "dwuskrzydłowa") {
      return data.filter((item) => item.acf.kategoria === "dwuskrzydłowa");
    } else if (currentFilter === "furtka") {
      return data.filter((item) => item.acf.kategoria === "furtka");
    }
  };

  return (
    <div className="w-screen relative container">
      <form class="w-[150px] md:ml-24 ">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Wybież filtr
        </label>
        <select
          id="countries"
          value={currentFilter}
          onChange={(e) => setCurrentFilter(e.target.value)}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {filters.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
       
      </form>
      <div className='flex flex-row-reverse gap-5 px-5 py-5 flex-wrap  justify-center'>
        {data ? Filtered().map((item,index) => ( 
            <Fade key={index} triggerOnce> <Garage key={index} src={item.acf.obraz} title={item.acf.tytul} prize={item.acf.cena}/></Fade>
        ))
        : <span className="loader"></span>
        }
        </div>
    </div>
  );
}

export default Gates;
