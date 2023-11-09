

function PrepereGround() {

  return (
    <div className="flex flex-col items-center py-10">    
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold text-center sm:text-4xl">Jak przygotować podłoże pod garaż blaszany – wybór metody</h1>
      <p className="mt-4 text-center">
        Garaż blaszany od <strong>ACELGARAGE</strong> to nie tylko schronienie dla Twojego auta, ale także praktyczna przestrzeń...
      </p>

      {/* Sekcja z obrazami */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        
        {/* Wylewka */}
        <div className="flex flex-col items-center text-center">
          <img src="/image/podloze/wylewka.png" alt="Wylewka betonowa" className="rounded-lg shadow-md"/>
          <h3 className="mt-2 text-lg font-medium">Wylewka betonowa</h3>
          <p className="text-gray-300">Dla maksymalnej stabilności.</p>
        </div>

        {/* Fundamenty */}
        <div className="flex flex-col items-center text-center">
          <img src="/image/podloze/fundament.png" alt="Fundamenty" className="rounded-lg shadow-md"/>
          <h3 className="mt-2 text-lg font-medium">Fundamenty</h3>
          <p className="text-gray-300">Trwałe rozwiązanie dla różnych zastosowań.</p>
        </div>

        {/* Kostka brukowa */}
        <div className="flex flex-col items-center text-center">
          <img src="/image/podloze/kostka.png" alt="Kostka brukowa" className="rounded-lg shadow-md"/>
          <h3 className="mt-2 text-lg font-medium">Kostka brukowa</h3>
          <p className="text-gray-300">Estetyczna i funkcjonalna opcja.</p>
        </div>

        {/* Betonowe bloczki */}
        <div className="flex flex-col items-center text-center">
          <img src="/image/podloze/bloczki.png" alt="Betonowe bloczki" className="rounded-lg shadow-md"/>
          <h3 className="mt-2 text-lg font-medium">Betonowe bloczki</h3>
          <p className="text-gray-300">Ekonomiczne i szybkie rozwiązanie.</p>
        </div>

      </div>

      {/* Dodatkowy tekst i CTA (Call to Action) */}
      <p className="mt-8 text-center text-gray-300">
        Każda z opcji podbudowy ma swoje zalety, a my w <strong>ACELGARAGE</strong> doradzimy Ci,
        która będzie najlepsza dla Twoich potrzeb. Zapraszamy do kontaktu i skorzystania
        z naszych usług.
      </p>
    </div>
    </div>
  )
}

export default PrepereGround