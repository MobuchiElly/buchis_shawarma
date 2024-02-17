import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MobileNav = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavbar = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="relative md:hidden">
      {!navOpen && (
        <button
          onClick={toggleNavbar}
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white md:hidden"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2zm0 6h14a1 1 0 110 2H3a1 1 0 110-2z"
            ></path>
          </svg>
        </button>
      )}
      {navOpen && (
        <span
          className="md:hidden text-slate-100 font-semibold text-lg mr-2"
          onClick={toggleNavbar}
        >
          X
        </span>
      )}
      {navOpen && (
        <ul className="md:hidden w-90vw p-0 flex flex-col flex-grow list-none text-white absolute right-0 top-70px bg-slate-50 px-2 pl-2 h-auto ml-1vw rounded" style={{borderTopRightRadius:'20px',borderBottomLeftRadius:'20px'}}>
          <Link href="/" className="w-100%">
            <li
              className="text-slate-600 text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300"
              onClick={toggleNavbar}
            >
              Home
            </li>
          </Link>
          <Link href="/account" className="w-100%">
            <li
              className="text-slate-600 text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300"
              onClick={toggleNavbar}
            >
              Account
            </li>
          </Link>
          <Link href="/products" className="w-100%">
            <li
              className="text-slate-600 text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300"
              onClick={toggleNavbar}
            >
              Products
            </li>
          </Link>
          <li className="text-slate-600 text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300">
            About
          </li>
          <li className="text-slate-600 text-sm py-6 pl-2 w-100% text-left cursor-pointer ' onClick={toggleNavbar}relative">
            Contact
          </li>
        </ul>
      )}
    </div>
  );
};

export default MobileNav;