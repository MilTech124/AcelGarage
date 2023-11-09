

function Way() {
    const items= [
        {
            title: "Kontakt",
            content: "Skontaktuj się z nami, aby uzyskać więcej informacji na temat naszych produktów i usług.",
            img: "/image/home/contact.jpg"
        },{
            title: "Wycena",
            content: "Wycenimy osobiście Twój garaż, aby zapewnić Ci najlepszą ofertę.",
            img: "/image/home/calc.webp"
        },{
            title: "Produkcja",
            content: "Po akceptacji oferty, rozpoczynamy produkcję Twojego garażu.",
            img: "/image/home/produkcja.jpg"
        },{
            title: "Montaż",
            content: "Nasi doświadczeni montażyści zamontują Twój garaż w ciągu 1 dnia.",
            img: "/image/home/1.jpg"
        }
    ]
  return (
<section className="w-full py-10">

<h2 className="text-center py-10">Droga do wymarzonego garażu</h2>

<div className="flex w-full">


    {items.map((item, index) => (
        <div key={index} className="w-1/4 relative lg:h-[600px] h-40 bg-no-repeat bg-cover bg-center transition-all duration-700 group border-l-8 border-black hover:w-1/3" style={{ backgroundImage: `url(${item.img})` }}>
            {/* make div with numbers 1-4 and make it absolute and center it when hover just hidden it */}
            <div className="absolute top-1/2 left-1/2 transform bg-black/50 p-5 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:hidden">
                <h1 className="text-white text-5xl font-bold">{index + 1}</h1>
            </div>
            <div className="group-hover:flex flex-col justify-center items-center h-full bg-black/50 hidden hover:opacity-100 opacity-0  hover:bg-black/90 transition-all duration-700 px-5 ">
                <h1 className="text-white text-2xl font-bold">{item.title}</h1>
                <p className="text-white text-sm text-center">{item.content}</p>
            </div>
       
        </div>
    ))}
</div>


</section>

  )
}

export default Way