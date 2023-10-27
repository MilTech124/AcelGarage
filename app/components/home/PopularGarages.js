import React from 'react'
import Garage from '../Garage'
import axios from 'axios';


const getData = async () => {
  try {
    const response = await axios.get(process.env.BACKEND_LINK+'garaze');
    //add only data if have ".acf.wyroznij" to array
    const data = response.data.filter((item) => item.acf.wyroznij);
    return data;
    
  } catch (error) {
    console.log(error);
  }
}

async function PopularGarages() {
  const data=await getData();
  return (
    <section className='py-10'>
    <h2 className='text-center pb-5'>Najpopularniejsze Garaże</h2>
    <div className='flex w-full justify-center gap-[10vw] flex-wrap'>
    {data ? data.map((item,index) => ( 
        <Garage key={index} link={'/garaze/'+item.slug} src={item.acf.obrazy[0].full_image_url} title={item.acf.tytul}/>
      ))
      : <p>Ładowanie danych ...</p>
      }
    </div>
     
        
    </section>
  )
}

export default PopularGarages