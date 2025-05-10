// © 2025 Mil-TECH Usługi IT (Jarosław Matusiak)
// Ten kod jest chroniony prawem autorskim. Zabronione jest jego odsprzedawanie i wykorzystanie komercyjne bez zgody autora.

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
    <head>
    <script dangerouslySetInnerHTML={{__html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MH44M4M')`}}>

    </script>

    </head>

      <body className={inter.className}>
        <Header />
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MH44M4M"
height="0" width="0" ></iframe>
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
