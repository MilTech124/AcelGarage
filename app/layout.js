import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Acel Garage-producent garaży blaszanych",
  description:"Odkryj jakość w Acel Garage. Specjalizujemy się w garażach blaszanych. Nasze produkty charakteryzują się wysoką jakością, trwałością i nowoczesnym designem, idealnie pasującym do każdego domu i przedsiębiorstwa. Wybierz Acel Garage dla niezawodnych, bezpiecznych i stylowych rozwiązań garażowych.",
  keywords: "Acel Garage, Acel, garaże blaszane, garaże premium, bramy, bramy garażowe, bramy segmentowe, bramy uchylne, garaże z wiatami, wiaty garażowe, konfigurator garaży",

};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className="scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <body className={inter.className}>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
