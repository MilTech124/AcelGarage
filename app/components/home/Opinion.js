import React from 'react'
import Image from 'next/image'

function Opinion() {
  return (
    <section id="opinion" className="bg-black p-10">
    <div className="p-10 flex max-md:flex-wrap gap-5 max-w-[1400px] mx-auto">
      <div className="bg-slate-600 p-5 lg:w-[50%] h-fit">
        <img src="/image/home/2.jpg" className="object-cover w-full"  alt="home" />
      </div>
      <div className="lg:w-[50%]">
        <h4 className="text-slate-600 font-bold">Cenimy zdanie klientów</h4>
        <h2 className="text-white text-2xl lg:text-5xl ">Najważniejsze zadowolenie klienta</h2>
        <p className="text-white pt-10 ">
          Każdy nasz klient jest traktowany jako jedyny i niepowtarzalny. Od
          samego początku prowadzimy proces wyceny, zamówienia i montażu
          wyłącznie indywidualnie.
        </p>
        <div className="bg-slate-600 mt-10 p-10 lg:ml-[-40%] lg:mr-[40%] max-sm:hidden hover:translate-x-10 transition-all ">
          <p className="text-white border-l-2 py-5 pl-5">
          &#34;Chciałbym polecić Wam firmę ACELGARAGE. Ich produkty są wykonane z
            wysokiej jakości materiałów, co gwarantuje trwałość i odporność&#34;
          </p>
          <p className="text-sm text-right text-white">Grzegorz Mąka</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Opinion