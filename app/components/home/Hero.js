"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";


function Hero() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

 const images =[
   {
      src: "/image/home/1.jpg",
      alt: "Image 1",
      title: "ACELGARAGE",
      subtitle: "Garaże-najwyższa jakość wykonania",
      link: "/kontakt",
    },
   {
      src: "/image/home/brama.jpg",
      alt: "Image 2",
      title: "Bramy Segmentowe",
      subtitle: "Twój garaż zasługuje na najlepsze: Wybierz bramy segmentowe",
      link: "/bramy",
    },
   {
      src: "/image/home/domki.jpg",
      alt: "Image 3",
      title: "Domki ogrodowe",
      subtitle: "Idealne miejsce dla narzędzi ogrodowych",
      link: "/bramy",
    },
   {
      src: "/image/home/3.jpg",
      alt: "Image 3",
      title: "Garaże z wiatami",
      subtitle: "Więcej niż tylko miejsce do parkowania: Garaże z dodatkową przestrzenią",
      link: "/garaze",
    },
   {
      src: "/image/home/kojec.jpg",
      alt: "Image 3",
      title: "Kojce dla pupili",
      subtitle: "Twój przyjaciel na czterech łapach zasługuje na swoją przestrzeń",
      link: "/kojce",
    },
  ]


  

  return (
    <section id="hero" className="w-full md:h-[700px]">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 md:pl-[10vh] w-full h-full bg-black/20 flex flex-col justify-center items-start">
              <h1 className="md:text-6xl text-xl font-bold text-white mb-5">
                {image.title}
              </h1>
              <h2 className="md:text-2xl text-left text-base font-bold text-white mb-5">
                {image.subtitle}
              </h2>
              <Link
                href={image.link}
                className="btn-acel"
              >
                Zobacz więcej
              </Link>
            </div>
          </div>
        </SwiperSlide>
      )
      )}

   


      
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </section>
  );
}

export default Hero;
