import Link from "next/link";
import React from "react";

function page() {
  return (
    <div
      id="contact"
      className="w-full relative  bg-no-repeat bg-right-bottom bg-contain bg-[url(/image/contact-bg.webp)]"
    >
      <div className="flex flex-col gap-5 md:p-20">
        <h1>Kontakt</h1>
        <p className="max-w-lg">
          Poszukujesz wysokiej jakości garaży blaszanych w przystępnych cenach?
          Skontaktuj się z nami, a nasi doświadczeni specjaliści pomogą Ci
          znaleźć idealne rozwiązanie dla Twoich potrzeb. Zaufaj naszemu
          doświadczeniu i dołącz do setek zadowolonych klientów, którzy wybrali
          nasze produkty. Czekamy na Twoje zapytanie!
        </p>

        <Link
          href="tel:+48 733003192"
          className="max-w-[400px] gap-5 flex items-center bg-white/50 hover:bg-white/60 hover:font-bold p-10 rounded-md cursor-pointer hover:scale-105 transition-all"        >
          <img src="./image/phone.svg" width={50} alt="phone" />
          <p className="text-2xl">+48 733003192</p>
        </Link>
        <Link
          href="tel:+48 733003152"
          className="max-w-[400px] gap-5 flex items-center bg-white/50 hover:bg-white/60 hover:font-bold p-10 rounded-md cursor-pointer hover:scale-105 transition-all"        >
          <img src="./image/phone.svg" width={50} alt="phone" />
          <p className="text-2xl">+48 733003152</p>
        </Link>
        <Link
          href="mailto:biuro@acelgarage.pl"
          className="max-w-[400px] gap-5 flex items-center bg-white/50 hover:bg-white/60 hover:font-bold p-10 rounded-md cursor-pointer hover:scale-105 transition-all"        >
          <img src="./image/mail.svg" width={50} alt="phone" />
          <p className="text-2xl">biuro@acelgarage.pl</p>
        </Link>
      </div>
    </div>
  );
}

export default page;
