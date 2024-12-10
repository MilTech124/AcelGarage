'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Garage from '../Garage';
import { Fade } from "react-awesome-reveal";

const getData = async (page) => {
    const response = await axios.get(`https://backend.acelgarage.pl/backend/wp-json/wp/v2/garaze?per_page=100&page=${page}`);
    return response.data;
};

function Filters() {
    const [filter, setFilter] = useState("drewnopodobny");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadMoreData();
    }, []);

    const loadMoreData = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        try {
            const newData = await getData(currentPage);
            setData((prevData) => [...prevData, ...newData]);

            // Sprawdź, czy API zwróciło mniej rekordów niż oczekiwano (koniec danych)
            if (newData.length < 100) {
                setHasMore(false);
            } else {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const currentData = data.filter((item) => item.acf.rodzaj === filter);

    const types = [
        { title: "Drewnopodobne", img: '/image/drewnopodobne.webp', type: "drewnopodobny" },
        { title: "Akrylowe", img: '/image/akrylowe.webp', type: "akrylowy" },
        { title: "Bramy segmentowe", img: '/image/brama.webp', type: "bramy" },
        { title: "Składziki", img: '/image/skladzik.webp', type: "skladzik" },
        { title: "Kojce", img: '/image/kojec.jpeg', type: "kojec" }
    ];

    const changeRes = (item) => {
        return item.acf.obrazy[0].full_image_url
            ? item.acf.obrazy[0].medium_srcset.split(", ")[0].split(" ")[0]
            : null;
    };

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap md:gap-10 gap-2 justify-center">
                {types.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => setFilter(item.type)}
                        className={`relative border-2 transition-all group cursor-pointer md:w-[250px] md:h-[200px] w-[100px] h-[75px] ${item.type === filter ? "bg-transparent border-4" : ""}`}
                    >
                        <img src={item.img} alt={item.title} className="w-full h-full" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center text-center items-end transition-all opacity-100 group-hover:bg-opacity-0">
                            <p className="text-white md:text-xl text-xs pb-1 translate-y-0 md:group-hover:-translate-y-10 transition-all md:group-hover:text-2xl">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filtered Content */}
            <div className="flex gap-5 px-5 py-5 flex-wrap justify-center">
                {currentData.map((item, index) => (
                    <Fade key={index} triggerOnce>
                        <Garage link={`/garaze/${item.slug}`} src={changeRes(item)} title={item.acf.tytul} prize={item.acf.cena} />
                    </Fade>
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center py-5">
                    <button
                        onClick={loadMoreData}
                        className="btn-acel"
                        disabled={isLoading}
                    >
                        {isLoading ? "Ładowanie..." : "Pokaż więcej"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Filters;
