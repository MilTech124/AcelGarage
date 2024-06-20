'use client'
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import Order from '../../utils/Order';

function CustomSlider({data}) 
 {
  
  const passingData = data[0] ? data[0] : data;

  const [nav1, setNav1] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [nav2, setNav2] = React.useState(null);


  const slider1 = useRef(); // using useRef instead of let
  const slider2 = useRef(); // using useRef instead of let

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []); // adding this useEffect to update nav1 and nav2 when the component mounts

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    infinite: true, 
    asNavFor: nav2 // passing nav2 instead of '.slider-nav'
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: nav1, // passing nav1 instead of '.slider-for'
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true, 
    centerPadding: '10px'
  };

  const images = passingData.acf.obrazy.map((img) =>{
    const mediumImageSrcSet = img.large_srcset.split(", ")[0].split(" ")[0];
    return mediumImageSrcSet;
  }
  );

  return (
    <div className='flex max-sm:flex-col'>
    {show ? <Order show={show} setShow={setShow}/> : null }
    
      <div id='slider' className='w-1/2 max-sm:w-full !max-h-screen'>
        <Slider 
          {...settingsMain}
          ref={slider => (slider1.current = slider)}
        >
          {images.map((img, index) => (
            <div key={index}>
              <Image src={img} height={600} width={800} className='object-center w-full !h-[50vh] object-cover ' alt="" />
            </div>
          ))}
        </Slider>
        <Slider
          {...settingsThumbs}
          ref={slider => (slider2.current = slider)}
        >
          {images.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt="img" className='max-h-[200px]' />
            </div>
          ))}
        </Slider>
      </div>
      <div className='w-full px-2 md:px-10'>
        <h1 className='text-3xl font-bold text-center'>{passingData.acf.tytul}</h1>
        <p className='text-left whitespace-pre-line md:p-5 p-2' dangerouslySetInnerHTML={{__html:passingData.acf.informacje}} ></p>
        {/* {data[0].acf.cena ? data[0].acf.cena: null} */}

        <button onClick={()=>setShow(true)} className='btn-acel py-5 animate-pulse flex items-center justify-center bg-white/20 w-full'>  Zamów Wycenę</button>

      </div>
    </div>
  );
}

export default CustomSlider;