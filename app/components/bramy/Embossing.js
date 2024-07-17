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
            <h2 className='text-black py-2'>Przetłoczenia wąskie</h2>
            <p>Przetłoczenia wąskie to nowoczesny i stylowy sposób dekorowania bram segmentowych.
             Charakteryzują się one cienkimi, subtelnymi liniami, które nadają bramie elegancki i minimalistyczny wygląd.
              Przetłoczenia wąskie są idealne dla osób ceniących nowoczesny design i chcących nadać swojemu domowi unikalny charakter. Dzięki swojej delikatnej formie, wąskie przetłoczenia dodają bramie lekkości i sprawiają, że cała konstrukcja prezentuje się nowocześnie i elegancko. Ponadto, takie przetłoczenia mogą wpływać na optyczne wydłużenie bramy, co jest szczególnie korzystne w przypadku mniejszych otworów garażowych.</p>
              <img src="/image/bramy/waskie-2.png" alt="gladkie-przetloczenie" className='md:opacity-0 group-hover:opacity-100 transition-all delay-75 duration-700'/>
        </div>
        <Image src="/image/bramy/waskie-1.png" alt='gladkie' width={400} height={400} className="object-cover md:w-1/2 h-full" />
    </div>
    {/* SECOND */}
    {/* THIRD */}
    <div className="flex max-md:flex-wrap group items-center gap-10 max-w-screen-xl">
        <Image src="/image/bramy/symetryczne-1.png" alt='gladkie' width={400} height={400} className="object-cover md:w-1/2 h-full" />
        <div className='md:w-1/2 text-black'>
            <h2 className='text-black py-2'>Przetłoczenia symetryczne</h2>
            <p>Przetłoczenia symetryczne to klasyczny i uniwersalny sposób dekorowania bram segmentowych.
             Cechują się regularnymi, powtarzającymi się wzorami, które nadają bramie harmonijny i zrównoważony 
             wygląd. Dzięki swojej symetrii, brama segmentowa z przetłoczeniami symetrycznymi doskonale komponuje
              się z różnymi stylami architektonicznymi, od tradycyjnych po nowoczesne. Dodatkowo, przetłoczenia 
              te zapewniają nie tylko estetyczny wygląd, ale również zwiększają sztywność paneli, co przekłada 
              się na ich wytrzymałość i długowieczność.</p>
              <img src="/image/bramy/symetryczne-2.png" alt="gladkie-przetloczenie" className='md:opacity-0 group-hover:opacity-100 transition-all delay-75 duration-700'/>
        </div>
    </div>

    {/* THIRD */}



    </section>
  )
}

export default Embossing