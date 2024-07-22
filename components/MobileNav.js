import React, { useState } from "react";
import Link from "next/link";


const MobileNav = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavbar = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="relative lg:hidden">
      <div className="w-8">
        {!navOpen && (
          <button
            onClick={toggleNavbar}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white lg:hidden cursor"
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
            className="lg:hidden text-slate-100 font-semibold text-lg ml-2 mr-1 cursor-pointer"
            onClick={toggleNavbar}
          >
            X
          </span>
        )}
      </div>
      {navOpen && (
        <ul className="lg:hidden w-90vw p-0 flex flex-col flex-grow list-none text-white absolute right-0 top-66px bg-slate-50 px-2 pl-2 h-auto ml-1vw rounded-sm shadow font-semibold" style={{borderTopRightRadius:'10px',borderBottomLeftRadius:'20px'}}>
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
          {/* <Link href="/products" className="w-100%">
            <li
              className="text-slate-900 text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300"
              onClick={toggleNavbar}
            >
              Products
            </li>
          </Link> */}
          {/* <li className="text-slate-900 text-sm py-4 pl-2 w-100% text-left cursor-pointer border-b border-slate-300">
            About
          </li> */}
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