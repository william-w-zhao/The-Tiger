"use client";

import { useState } from "react";
import Link from "next/link";

import MarqueeBar from "./stockmarquee";

import Tiger from "@/assets/Tiger.png";
import Text from "@/assets/Text.png";

import { FaInstagram } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_BTN =
  "bg-transparent border-0 outline-none shadow-none px-4 font-medium text-[1.2rem] text-black cursor-pointer hover:text-orange-400 transition-colors duration-300";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="pr-5 pl-5 mb-4">
      <MarqueeBar />

      <nav className="w-full pb-2 bg-white">
        <div className="relative w-full flex items-center px-4 h-16">
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/">
              <img src={Tiger.src} alt="Tiger logo" className="h-16 w-auto" />
            </Link>

            <Link href="/articles" className={NAV_BTN}>
              Articles
            </Link>

            <Link href="/issues" className={NAV_BTN}>
              Issues
            </Link>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/">
              <img
                src={Text.src}
                alt="The Princeton Tiger"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          <div className="ml-auto hidden lg:flex items-center gap-2">
            <Link href="/masthead" className={NAV_BTN}>
              Masthead
            </Link>

            <Link href="/about" className={NAV_BTN}>
              About
            </Link>

            <Link href="/contact" className={NAV_BTN}>
              Contact
            </Link>

            <a
              href="https://www.instagram.com/theprincetontiger"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={25} />
            </a>
          </div>

          <button
            onClick={() => setOpen((existing) => !existing)}
            className="ml-auto lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden border-t border-gray-200 transition-all duration-300 ease-out ${
            open
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="flex flex-col px-4 py-3 gap-4">
            <Link href="/articles" className={NAV_BTN} onClick={closeMenu}>
              Articles
            </Link>

            <Link href="/issues" className={NAV_BTN} onClick={closeMenu}>
              Issues
            </Link>

            <Link href="/masthead" className={NAV_BTN} onClick={closeMenu}>
              Masthead
            </Link>

            <Link href="/about" className={NAV_BTN} onClick={closeMenu}>
              About
            </Link>

            <Link href="/contact" className={NAV_BTN} onClick={closeMenu}>
              Contact
            </Link>

            <a
              href="https://www.instagram.com/theprincetontiger"
              target="_blank"
              rel="noopener noreferrer"
              className="self-center text-black hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </nav>

      <hr className="h-[1.5px] w-full border-0 bg-[#DEDEDE] my-px mx-auto" />
    </div>
  );
}
