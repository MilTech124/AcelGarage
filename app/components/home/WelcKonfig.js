"use client"
import Link from "next/link";
import { Slide } from "react-awesome-reveal";
function WelcKonfig() {
  return (

  <div className="flex justify-center items-center gap-5 bg-slate-800 py-2 ">
  <Slide>
    <p className="md:text-2xl">
        Zapraszamy do skorzystania z naszego konfiguratora garaży !!!!
    </p>
  </Slide>
  <Link
    href="/konfigurator"
    className="bg-white/50 p-2 rounded-md hover:scale-105 transition-all"
  >
    <img src="/image/Automation.svg" />
  </Link>
</div>

  )
}

export default WelcKonfig