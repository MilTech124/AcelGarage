import Image from 'next/image'
function Adds() {
  return (
    <div id='akcesoria' className='bg-[#484848] py-10 flex flex-col items-center'>
        <h2>Akcesoria dla garaży</h2>
        <Image src='/image/ads.webp' alt='ad' width={1920} height={1080} layout='responsive' />
    </div>
  )
}

export default Adds