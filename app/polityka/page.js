export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Polityka prywatności</h1>

        <p className="mt-3 text-2xl">Polityka Prywatności firmy AcelGarage</p>

        <div className="mt-3 flex flex-col gap-10 text-lg text-left">
          <div>
            <h2>Wstęp</h2>
            <p>
              Firma AcelGarage szanuje prywatność swoich klientów i zobowiązuje
              się do ochrony ich danych osobowych. Niniejsza Polityka
              Prywatności wyjaśnia, jakie dane zbieramy, jak je wykorzystujemy i
              jakie prawa mają nasi klienci w związku z ich danymi osobowymi.
            </p>
          </div>
          <div>
            <h2>Jakie dane zbieramy?</h2>
            <p>
              Zbieramy dane, które są niezbędne do realizacji naszych usług,
              takie jak imię i nazwisko, adres e-mail, numer telefonu oraz adres
              dostawy.
            </p>
          </div>
          <div>
            {" "}
            <h2>Jak wykorzystujemy te dane?</h2>
            <p>
              Dane, które zbieramy, są wykorzystywane wyłącznie do celów
              realizacji zamówień, obsługi klienta oraz do celów statystycznych
              i analitycznych.
            </p>
          </div>

          <div>
            <h2>Jak chronimy Twoje dane?</h2>
            <p>
              Zastosowaliśmy odpowiednie środki techniczne i organizacyjne, aby
              chronić Twoje dane przed utratą, zmianą, kradzieżą lub dostępem
              osób nieuprawnionych.
            </p>
          </div>

          <div>
            {" "}
            <h2>Jakie są Twoje prawa?</h2>
            <p>
              Masz prawo do dostępu do swoich danych, ich poprawiania,
              usunięcia, ograniczenia przetwarzania, prawo do przenoszenia
              danych, prawo do wniesienia sprzeciwu wobec przetwarzania danych
              oraz prawo do wniesienia skargi do organu nadzorczego.
            </p>
          </div>

          <div>
            {" "}
            <h2>Kontakt</h2>
            <p>
              Jeśli masz pytania dotyczące naszej Polityki Prywatności,
              skontaktuj się z nami pod adresem: kontakt@acelgarage.com
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          <a
            href="/"
            className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Powrót do strony głównej
          </a>
        </div>
      </main>
    </div>
  );
}
