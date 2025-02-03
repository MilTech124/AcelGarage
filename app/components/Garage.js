"use client";
import Link from "next/link";


function Garage({ src, title, link, prize }) {



  return (
    <div
      className="flex flex-col items-center justify-center z-10"  
    >
    
      <div
        style={{ backgroundImage: `url(${src})` }}
        className="md:w-80 md:h-80  w-40 h-40 bg-cover bg-center hover:bg-right rounded-md shadow-white shadow-sm hover:shadow-md hover:shadow-white transition-all duration-500"
      >
        {/* ON HOVER SHOW BUTTON ,TITLE AND SHADOW ON BG */}
        <p className="text-white md:text-2xl font-bold text-center bg-black/50">
            {title}
          </p>
        <div className="flex flex-col items-center justify-center w-full h-full bg-black/50 hover:bg-transparent transition-all duration-500">
      
    
        {/* ON HOVER SHOW BUTTON ,TITLE AND SHADOW ON BG */}
      </div>
    
        
        </div>
        {link ? (
            <Link
              href={link}
              className="bg-white hover:bg-white/80 text-black/50 hover:text-black/80 md:px-10 py-2 rounded-b-md transition-all duration-500 w-full  text-center "
            >
              {prize ? `${prize} zł` : <p className="font-semibold">Zamów Wycenę</p>}
            </Link>
          ) : <Link href={src} target="_blank"  ><p className="btn-acel font-semibold">Powiększ</p></Link>}
    </div>
  );
}

export default Garage;
