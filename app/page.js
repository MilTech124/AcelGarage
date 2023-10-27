import Hero from "./components/home/Hero";
import PopularGarages from "./components/home/PopularGarages";
import About from "./components/home/About";
import Opinion from "./components/home/Opinion";
import Way from "./components/home/Way";
import Link from "next/link";

function page() {

  return <main className="">
    <Hero />    

    {/* ZAPRASZAMY DO KALKULATORA */}
    <div className="flex justify-center items-center gap-5 bg-slate-800 py-2 ">
      <p className="md:text-2xl">Zapraszamy do skorzystania z naszego konfiguratora garaży !!!!</p>
      <Link href="/kalkulator" className="bg-white/50 p-2 rounded-md hover:scale-105 transition-all"><img  src="/image/Automation.svg" /></Link>
      
    </div>
    {/* ZAPRASZAMY DO KALKULATORA */}

    <PopularGarages />
    <Opinion />
    <Way />
    <About />
  </main>;
 
}

export default page;
