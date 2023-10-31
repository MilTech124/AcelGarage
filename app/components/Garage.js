import Link from "next/link";

function Garage({ src, title, link,prize }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        style={{ backgroundImage: `url(${src})` }}
        className="md:w-80 md:h-80  w-40 h-40 bg-cover bg-center hover:bg-right rounded-md shadow-white shadow-sm hover:shadow-md hover:shadow-white transition-all duration-500"
      >
        {/* ON HOVER SHOW BUTTON ,TITLE AND SHADOW ON BG */}
        <div className="flex flex-col items-center justify-center w-full h-full bg-black/50 hover:bg-transparent transition-all duration-500">
          <p className="text-white md:text-2xl font-bold text-center">{title}</p>

          <Link
            href={link}
            className="bg-white/50 hover:bg-white/80 text-black/50 hover:text-black/80 md:px-10 py-2 rounded-md transition-all duration-500"
          >
           {prize ? prize : "Zamów Wycenę" } 
          </Link>
        </div>
        {/* ON HOVER SHOW BUTTON ,TITLE AND SHADOW ON BG */}
      </div>
    </div>
  );
}

export default Garage;
