"use client";
import { Bars2Icon as Menu, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header id="header" className="bg-black relative border-b text-white z-10">
      <div className="mx-auto">
        <div className="bg-slate-800 border-b-2 max-sm:text-xs text-sm border-white/20 py-1 flex justify-center max-sm:justify-start gap-5 relative">
          <Link href="tel:733003192" className="top-item">
            <img src="/image/phone.svg" />
            <span>+48 733003192</span>
          </Link>
          <Link href="tel:733003192" className="top-item">
            <img src="/image/phone.svg" />
            <span>+48 733003192</span>
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
            <a href="/" className="menu-item">
              Strona Główna
            </a>
            <a href="/bramy" className="menu-item">
              Bramy Segmentowe
            </a>
            <a href="/garaze" className="menu-item">
              Garaże
            </a>
            {/* <a href="/kojce" className="menu-item">
              Kojce
            </a>           */}
            <a href="/konfigurator" className="menu-item">
              Konfigurator
            </a>
            <a href="/kontakt" className="menu-item">
              Kontakt
            </a>
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
