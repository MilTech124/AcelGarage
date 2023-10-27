function About() {
  return (
    //two column layout with some text and bg image
    <section className="py-10 mx-auto max-w-screen-lg group relative bg-white/20 p-2 my-10 cursor-pointer rounded-md">
      <div className="w-1/2 h-full absolute top-0 right-0 group-hover:translate-x-[-100%] transition-all delay-75 duration-1000 max-sm:hidden ">
        <img src="/logo-white.png" className="w-full h-full" alt="" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="w-full md:w-1/2">
          <img src="/image/home/1.jpg" />
        </div>
        <div className="w-full md:w-1/2 ">
          <h1 className="text-3xl font-bold mb-5">
            ACELGARAGE: Mistrz Garaży
          </h1>
          <p className="text-base">
            Nasza firma, z pasją tworzy każdy garaż, ustanowiła
            nowe standardy w branży. Współczesne technologie
            zmieniają świat, a w ACELGARAGE wierzymy, że garaże blaszane także
            powinny iść z duchem czasu. Wykorzystujemy najnowocześniejsze
            technologie, które zapewniają trwałość, bezpieczeństwo i
            estetykę naszych produktów. Nie chodzi nam tylko o to, aby nasze
            garaże były trwałe, ale także, aby były estetyczne i funkcjonalne.
            Każdy garaż, który opuszcza nasze zakłady, to efekt pracy
            doświadczonych rzemieślników, dbających o każdy detal. Dołącz do
            grona naszych zadowolonych klientów i daj nam służyć Ci naszym
            doświadczeniem, jakością i pasją. Ponieważ w ACELGARAGE, garaż
            blaszany to nie tylko produkt, to przede wszystkim zadowolony
            klient.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
