'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Garage from '../Garage';
import { Fade } from "react-awesome-reveal";

const getAllData = async () => {
    const allData = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
        const response = await axios.get(
            `https://backend.acelgarage.pl/backend/wp-json/wp/v2/garaze`,
            {
                params: {
                    per_page: 100, // Maksymalna liczba rekordów na stronę
                    page, // Aktualna strona
                },
            }
        );
        allData.push(...response.data); // Dodaj rekordy do tablicy

        // Sprawdź, czy są kolejne strony
        if (response.data.length < 100) {
            hasMore = false; // Jeśli rekordów jest mniej niż 100, kończ pętlę
        } else {
            page++; // Przejdź do następnej strony
        }
    }

    return allData; // Zwróć wszystkie rekordy
};


function Filters() {
    const [filter, setFilter] = useState("drewnopodobny"); // Wybrany filtr
    const [allData, setAllData] = useState([]); // Wszystkie dane
    const [filteredData, setFilteredData] = useState([]); // Przefiltrowane dane

    // Pobranie wszystkich danych z API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllData(); // Pobierz wszystkie rekordy
                console.log("Pobrane dane:", data);
                setAllData(data); // Ustaw pełne dane
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    // Filtrowanie danych na podstawie wybranego filtra
    useEffect(() => {
        const filtered = allData.filter((item) => item.acf.rodzaj === filter);
        console.log("Przefiltrowane dane:", filtered);
        setFilteredData(filtered); // Ustaw przefiltrowane dane
    }, [filter, allData]);

    const types = [
        { title: "Drewnopodobne", img: '/image/drewnopodobne.webp', type: "drewnopodobny" },
        { title: "Akrylowe", img: '/image/akrylowe.webp', type: "akrylowy" },
        { title: "Bramy segmentowe", img: '/image/brama.webp', type: "bramy" },
        { title: "Składziki", img: '/image/skladzik.webp', type: "skladzik" },
        // { title: "Kojce", img: '/image/kojec.jpeg', type: "kojec" }
    ];

    const changeRes = (item) => {
        return item.acf.obrazy && item.acf.obrazy.length > 0
            ? item.acf.obrazy[0].medium_srcset.split(", ")[0].split(" ")[0]
            : null;
    };

    return (
        <div>
            {/* Filtry */}
            <div className="flex flex-wrap md:gap-10 gap-2 justify-center">
                {types.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setFilter(item.type)} // Zmiana filtra
                        className={`relative border-2 transition-all group cursor-pointer md:w-[250px] md:h-[200px] w-[100px] h-[75px] ${
                            item.type === filter ? "bg-transparent border-4" : ""
                        }`}
                    >
                        <img src={item.img} alt={item.title} className="w-full h-full" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center text-center items-end transition-all opacity-100 group-hover:bg-opacity-0">
                            <p className="text-white md:text-xl text-xs pb-1 translate-y-0 md:group-hover:-translate-y-10 transition-all md:group-hover:text-2xl">
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Wyniki */}
            <div className="flex gap-5 px-5 py-5 flex-wrap justify-center">
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <Fade key={index} triggerOnce>
                            <Garage
                                link={`/garaze/${item.slug}`}
                                src={item.acf.obrazy ? changeRes(item) : null}
                                title={item.acf.tytul}
                                prize={item.acf.cena}
                            />
                        </Fade>
                    ))
                ) : (
                    <span className="loader"></span>
                )}
            </div>
        </div>
    );
}

export default Filters;
