import Image from 'next/image'
function Embossing() {
  return (
    <section className="flex flex-col items-center w-full bg-white">
    {/* FIRST */}
    <div className="flex max-md:flex-wrap group items-center gap-10 max-w-screen-xl">
        <Image src="/image/bramy/gladkie.png" alt='gladkie' width={400} height={400} className="object-cover md:w-1/2 h-full" />
        <div className='md:w-1/2 text-black'>
            <h2 className='text-black py-2'>Przetłoczenia gładkie</h2>
            <p>Przetłoczenia gładkie to popularny i elegancki sposób dekorowania bram segmentowych.
             Charakteryzują się one powierzchnią bez wystających elementów, co zapewnia estetyczny 
             wygląd bramy oraz ułatwia jej czyszczenie. W porównaniu z przetłoczeniami z wyraźnymi krawędziami
             , przetłoczenia gładkie są subtelne i delikatne, co sprawia, że brama segmentowa wydaje się
              lżejsza i bardziej harmonijna.</p>
              <img src="/image/bramy/gladkie-2.png" alt="gladkie-przetloczenie" className='md:opacity-0 group-hover:opacity-100 transition-all delay-75 duration-700'/>
        </div>
    </div>
    {/* FIRST */}
    {/* SECOND */}
    <div className="flex max-md:flex-wrap group items-center gap-10 max-w-screen-xl">
        <div className='md:w-1/2 text-black'>
            <h2 className='text-black py-2'>Przetłoczenia gładkie</h2>
            <p>Przetłoczenia gładkie to popularny i elegancki sposób dekorowania bram segmentowych.
             Charakteryzują się one powierzchnią bez wystających elementów, co zapewnia estetyczny 
             wygląd bramy oraz ułatwia jej czyszczenie. W porównaniu z przetłoczeniami z wyraźnymi krawędziami
             , przetłoczenia gładkie są subtelne i delikatne, co sprawia, że brama segmentowa wydaje się
              lżejsza i bardziej harmonijna.</p>
              <img src="/image/bramy/gladkie-2.png" alt="gladkie-przetloczenie" className='md:opacity-0 group-hover:opacity-100 transition-all delay-75 duration-700'/>
        </div>
        <Image src="/image/bramy/gladkie.png" alt='gladkie' width={400} height={400} className="object-cover md:w-1/2 h-full" />
    </div>
    {/* SECOND */}
    {/* THIRD */}
    <div className="flex max-md:flex-wrap group items-center gap-10 max-w-screen-xl">
        <Image src="/image/bramy/gladkie.png" alt='gladkie' width={400} height={400} className="object-cover md:w-1/2 h-full" />
        <div className='md:w-1/2 text-black'>
            <h2 className='text-black py-2'>Przetłoczenia gładkie</h2>
            <p>Przetłoczenia gładkie to popularny i elegancki sposób dekorowania bram segmentowych.
             Charakteryzują się one powierzchnią bez wystających elementów, co zapewnia estetyczny 
             wygląd bramy oraz ułatwia jej czyszczenie. W porównaniu z przetłoczeniami z wyraźnymi krawędziami
             , przetłoczenia gładkie są subtelne i delikatne, co sprawia, że brama segmentowa wydaje się
              lżejsza i bardziej harmonijna.</p>
              <img src="/image/bramy/gladkie-2.png" alt="gladkie-przetloczenie" className='md:opacity-0 group-hover:opacity-100 transition-all delay-75 duration-700'/>
        </div>
    </div>

    {/* THIRD */}



    </section>
  )
}

export default Embossing