'use client'
import{ useEffect, useState } from 'react'
import axios from 'axios'
import Garage from '../Garage'
import {Fade} from "react-awesome-reveal";

const  getData = async() => {
    
    const response = await axios.get(`https://backend.acelgarage.pl/backend/wp-json/wp/v2/garaze?per_page=100`)
    const data = await response.data 
    return data
}

 function Filters() {

    const [filter, setFilter] = useState("drewnopodobny")
    const [data, setData] = useState(null)

    useEffect(() => {
        getData().then((data) => {
            setData(data)
        })
    }, [])

    const currentData = data ? data.filter((item) => item.acf.rodzaj === filter) : null

  
    const types =[
        {
            title: "Drewnopodobne",
            img:'/image/drewnopodobne.webp',
            type:"drewnopodobny"
        },{
            title:"Akrylowe",
            img:'/image/akrylowe.webp',
            type:"akrylowy"
        },{
            title:"Bramy segmentowe",
            img:'/image/brama.webp',
            type:"bramy"
        },{
            title: "Składziki",
            img:'/image/skladzik.webp',
            type:"skladzik"
        },{
            title: "Kojce",
            img:'/image/kojec.jpeg',
            type:"kojec"
        }
    ]


    //changing resolution of image
    const changeRes = (item) => {
       return item.acf.obrazy[0].full_image_url ? item.acf.obrazy[0].medium_srcset.split(", ")[0].split(" ")[0] : null
      }
 
    
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
        {/* IMAGES BY FILTER */}
        <div className="flex flex-wrap md:gap-10 gap-2 justify-center">
            {types.map((item, index) => {
                return(
                    <div key={index} onClick={()=>setFilter(item.type)} className='relative border-2 transition-all group cursor-pointer md:w-[250px] md:h-[200px] w-[100px] h-[75pxpx] '>
                        <img src={item.img} alt={item.title} className={`w-full h-full`} />
                        <div className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center text-center items-end  transition-all opacity-100 group-hover:bg-opacity-0 ${item.type === filter ? "bg-transparent border-4" : ""} `}>
                            <p className="text-white md:text-xl text-xs pb-1 translate-y-0 md:group-hover:-translate-y-10 transition-all md:group-hover:text-2xl">{item.title}</p>
                        </div>  
                    </div>
                )
            })}

        </div>
     {/* IMAGES BY FILTER */}
    <div className='flex gap-5 px-5 py-5 flex-wrap justify-center'>
        {currentData ? currentData.map((item,index) => ( 
            <Fade key={index} triggerOnce> <Garage key={index} link={'/garaze/'+item.slug} src={item.acf.obrazy ? changeRes(item) :null} title={item.acf.tytul} prize={item.acf.cena}/></Fade>
        ))
        : <span className="loader"></span>
        }
    </div>
    </div>
  );
}

export default Filters;
