import Image from "next/image"



function GateColour() {
    const images = [
        {
            src: '/image/bramy/czarny.jpg',
            alt: 'gladkie',
            title: 'Czarny 7016M',
        },
        {
            src: '/image/bramy/bialy9.jpg',
            alt: 'gladkie',
            title: 'Biały 9016 P',
        },
        {
            src: '/image/bramy/antracyt.jpg',
            alt: 'gladkie',
            title: 'Antracyt',
        },
        {
            src: '/image/bramy/ciemny_orzech.jpg',
            alt: 'gladkie',
            title: 'Ciemny orzech',
        },
        {
            src: '/image/bramy/jasny_orzech.jpg',
            alt: 'gladkie',
            title: 'Jasny orzech',
        },
        {
            src: '/image/bramy/struktura9010.jpg',
            alt: 'gladkie',
            title: 'Struktura9010',
        },
        {
            src: '/image/bramy/struktura8014.jpg',
            alt: 'gladkie',
            title: 'Struktura8014',
        },
        {
            src: '/image/bramy/struktura6009.jpg',
            alt: 'gladkie',
            title: 'Struktura6009',
        },
        {
            src: '/image/bramy/struktura8014.jpg',
            alt: 'gladkie',
            title: 'Struktura8014',
        },
        {
            src: '/image/bramy/s1.jpg',
            alt: 'gladkie',
            title: 'Struktura9010',
        },
        {
            src: '/image/bramy/s2.jpg',
            alt: 'gladkie',
            title: 'Struktura9010',
        },
        {
            src: '/image/bramy/s3.jpg',
            alt: 'gladkie',
            title: 'Struktura9006',
        },
        {
            src: '/image/bramy/rm8-smooth-9010.jpg',
            alt: 'gladkie',
            title: 'rm8-smooth-9010',
        },
        {
            src: '/image/bramy/rm8-smooth-9016p.jpg',
            alt: 'gladkie',
            title: 'rm8-smooth-9016p',
        },
        {
            src: '/image/bramy/rm16-smooth-9016p.jpg',
            alt: 'gladkie',
            title: 'rm16-smooth-9016p',
        },
        {
            src: '/image/bramy/rv-smooth-9016p.jpg',
            alt: 'gladkie',
            title: 'rv-smooth-9016p',
        },
    ]

  return (
    <section className="bg-white w-full flex flex-col items-center justify-center">
        <h2 className="text-black">Kolorystyka oraz przetłoczenia</h2>
        <div className="w-full flex flex-wrap">
        { images.map((image,index)=>(
            <div key={index} className="w-1/3 group active:scale-150 active:z-50 hover:cursor-zoom-in hover:border relative">
                <Image src={image.src} alt={image.alt} width={800} height={800} className="object-cover  !h-full !w-full" />
                <div className="absolute top-0 left-0 w-full h-full group-hover:opacity-0 bg-black/20 flex items-center justify-center">
                <h4 className='text-white'>{image.title}</h4>
                </div>
         


            </div>
            
        ))}
        </div>
    </section>
  )
}

export default GateColour