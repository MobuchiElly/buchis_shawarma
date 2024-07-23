import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MobileNav = ({quantity}) => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavbar = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="lg:hidden w-full flex items-center h-full pr-6">
      <div className="w-3/5 h-full">
        <div className="border border-green-600 h-full">
          <Image src="/img/buchislogo.png" alt="logo" width="120" height="100" className="border h-full pb-4"/>
        </div>
        <h1 className="text-white absolute top-16 left-4 italic text-sm font-light mt-1 pl-1">
          Shawarma
        </h1>
      </div>
      <div className="w-2/5 flex justify-end items-center">
        <Link href="/cart" className="mr-4">
            <Image src="/img/cart.png" alt="logo" width="30" height="30" />
            <div className={`absolute bg-white font-bold p-2 py-0 rounded-full p3 text-main-color right-16 top-8 ${quantity > 0 ? "animate-pulse" : ""}`}
            >
              {quantity}
            </div>
        </Link>
        <div className="w-8">
          {!navOpen ? (
            <button
              onClick={toggleNavbar}
              className="flex items-center p-2 border rounded text-white border-white hover:text-white hover:border-white lg:hidden cursor"
            >
              <svg
                className="fill-current h-5 w-6"
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
          ) : (
            <span
              className="text-slate-100 font-semibold text-lg pl-2 ml-2 mr-1 cursor-pointer"
              onClick={toggleNavbar}
            >
              X
            </span>
          )}
        </div>
      </div>
      {navOpen && (
        <ul className="lg:hidden w-full flex flex-col flex-grow list-none text-white absolute right-0 top-[16vh] bg-slate-50 px-2 h-auto ml-1vw rounded-sm shadow font-semibold" style={{borderTopRightRadius:'10px',borderBottomLeftRadius:'20px'}}>
          <Link href="/" className="w-100%">
            <li
              className="text-slate-900 bold text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300"
              onClick={toggleNavbar}
            >
              Home
            </li>
          </Link>
          <Link href="/account" className="w-100%">
            <li
              className="text-slate-900 text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300"
              onClick={toggleNavbar}
            >
              Account
            </li>
          </Link>
          <Link href="/contact-us">
            <li className="text-slate-900 text-sm py-6 pl-2 w-100% text-left cursor-pointer relative" onClick={toggleNavbar}>
              Contact
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default MobileNav;