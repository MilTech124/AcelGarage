import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <section id="header" className="relative flexflex-col items-center">
        {/* <Image src='/image/home/1.jpg' alt='header' width={1920} height={1080} className='relative h-[300px] object-cover'  />
        <h1 className='absolute top-10 '>Informacje</h1> */}
        <div className='bg-yellow-500 p-5 max-sm:mt-20 w-full '>
            <ul className='flex list-disc gap-10 justify-center cursor-pointer text-xl font-semibold'>
                <li className='hover:scale-105 transition-all'><Link href="#wylewka">Przygotowanie podłoża</Link></li>
                <li className='hover:scale-105 transition-all'><Link href="#akcesoria">Akcesoria garażu</Link></li>
                {/* <li>Transport</li> */}
            </ul>
        </div>

    </section>
  )
}

export default Header