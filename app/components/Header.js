"use client";
import { Bars2Icon as Menu, XMarkIcon,UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header id="header" className="bg-black relative border-b text-white z-10">
    <Link href='/login'>
      <UserCircleIcon className="absolute max-sm:hidden z-20 top-0 right-5 w-10 h-10 p-2 hover:text-red-500 text-white" />
    </Link>
     
      <div className="mx-auto">
        <div className="bg-slate-800 border-b-2 max-sm:text-[8px] text-sm border-white/20 py-1 flex justify-center max-sm:justify-start gap-5 relative">
          <Link href="tel:733003192" className="top-item">
            <img src="/image/phone.svg" />
            <span>+48 733003192</span>
          </Link>
          <Link href="tel:733003152" className="top-item">
            <img src="/image/phone.svg" />
            <span>+48 733003152</span>
          </Link>
          <Link href="mailto:biuro@acelgarage.pl" className="top-item">
            <img src="/image/mail.svg" />
            <span>biuro@acelgarage.pl</span>
          </Link>

          <Link href="/garaze" className="top-item">
            <img src="/image/bag.svg" />
          </Link>
        </div>
        <div className=" container mx-auto flex max-sm:flex-col justify-between items-center py-4">
          <img src="/image/logo-white.jpg" className="w-60" />
          <div className="lg:hidden absolute top-15 right-10">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div
            className={`lg:flex ${
              isOpen ? "flex gap-5" : "hidden"
            } transition-all duration-300 max-md:flex-col`}
          >
            <Link href="/" className="menu-item">
              Strona Główna
            </Link>
            <Link href="/bramy-segmentowe" className="menu-item">
              Bramy Segmentowe
            </Link>
            <Link href="/bramy" className="menu-item">
              Bramy
            </Link>
            <Link href="/garaze" className="menu-item">
              Garaże
            </Link>
            <a href="/kojce" className="menu-item">
              Kojce
            </a>
            <Link href="/konfigurator" className="menu-item">
              Konfigurator
            </Link>
            <Link href="/info" className="menu-item">
              Info
            </Link>
            <Link href="/kontakt" className="menu-item">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
      <Link href="/konfigurator" className="absolute bottom-0 right-0 flex items-center bg-slate-800 p-2 border-2 border-slate-400  -mb-10 w-[200px]">
        <img className="w-10 h-10 pr-2" src="/image/Automation.svg" />
        <p>Konfigurator</p>
      </Link>
    </header>
  );
}
