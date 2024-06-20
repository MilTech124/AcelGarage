import React from "react";
import axios from "axios";
import Garage from "../components/Garage";
import Image from "next/image";

const page = async () => {
  const getData = async () => {
    const response = await axios.get(
      `https://backend.acelgarage.pl/backend/wp-json/wp/v2/kojce_wp?per_page=100`
    );
    const data = await response.data;
    return data;
  };

  const data = await getData();

  return (
    <main className="py-10 mx-auto container">
      <div className="flex max-md:flex-wrap">
        <div className="flex flex-col justify-center md:px-8 ">
          <h1 className="text-4xl font-bold">Kojce</h1>
          <p className="py-10">
            W ofercie naszej firmy znajdują się nowoczesne i funkcjonalne kojce,
            które idealnie sprawdzą się w każdym domu lub garażu. Dzięki
            zastosowaniu wysokiej jakości materiałów oraz nowoczesnych rozwiązań
            technologicznych, nasze kojce gwarantują bezpieczeństwo i wygodę
            użytkowania przez wiele lat.<br></br> Zapraszamy do zapoznania się z naszą
            ofertą i wybrania kojca, który spełni Państwa oczekiwania
          </p>
        </div>
        <Image src="https://backend.acelgarage.pl/backend/wp-content/uploads/2024/03/343958844_1622180651616532_7429944585842222815_n-e1718889019469.jpg" alt="Kojce"
          width={1280} height={980} className="md:w-2/5"  />
      </div>
      <div className="flex gap-5 pt-10 justify-center max-sm:flex-col flex-wrap">
        {data
          ? data.map((item) => (
              <Garage
                src={item.acf.obrazy[0].media_details.sizes.medium.source_url}
                title={item.title.rendered}
                link={`/kojce/${item.id}`}
                prize={item.acf.prize}
              />
            ))
          : null}
      </div>
    </main>
  );
};

export default page;
