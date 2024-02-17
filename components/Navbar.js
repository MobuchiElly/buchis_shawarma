'use client'
import Image from "next/image";
import {useSelector } from "react-redux";
import Link from "next/link";
import NavDropDown from "./NavDropDown";
import MobileNav from '../components/MobileNav';

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
 

  const toggleNavbar = () => {

  }
  const content = {
    contact: {
      line1: "buchidevv@gmail.com",
      line2: "Phone: 08134923317",
    },
  };

  return (
    <div className="flex justify-between items-center md:p-x-15 pr-4 md:px-4  bg-main-bg-600 sticky top-0 h-m100 z-50">
      <div className="md:hidden">
        <Image src="/img/buchislogo.png" alt="logo" width="110" height="80" className="" style={{top:'0px'}}/>
        <span className="text-white absolute top-16 left-4 italic text-sm font-light ">Shawarma</span>
      </div>
      <div className="hidden md:flex md:items-center lg:flex-3 flex-1">
        <div className="bg-white rounded-full p-2 w-my-50 h-my-50">
          <Image
            src="/img/telephone.png"
            alt="telephone"
            width={32}
            height={32}
          />
        </div>
        <div className="ml-5 text-white">
          <div className="text-xss font-semibold">ORDER NOW!</div>
          <div className="font-bold text-xl">08134923317</div>
        </div>
      </div>
      
      {/*Navbar Lists*/}
      <div className=" hidden lg:block relative" style={{ flex: 3 }}>
        <ul className="p-0 flex items-center justify-center list-none text-white">
          <Link href="/">
            <li className="font-my500 cursor-pointer m-5">Home</li>
          </Link>
          <Link href="/products">
            <li className="font-my500 cursor-pointer m-5">Products</li>
          </Link>
          <Image src="/img/buchislogo.png" alt="logo" width="160" height="80" />
          <li className="font-my500 cursor-pointer m-5">About</li>
          <li className="font-my500 cursor-pointer m-5 relative">
            <NavDropDown />
          </li>
        </ul>
      </div>

      <div className="flex-1 flex justify-end items-center relative">
        <div className=" hidden md:inline-flex text-white font-my500 cursor-pointer pr-6 mr-6">
          <Link href="/account" className="bg-red-400 p-2 rounded-lg">
            My Account
          </Link>
        </div>

        <Link href="/cart" className="absolute">
          <div className="last:justify-end mr-4 md:mr-0">
            <div className="">
              <Image src="/img/cart.png" alt="logo" width="30" height="30" />
              <div
                className="absolute bg-white font-bold w-5 h-5 flex justify-center items-center rounded-full p3 text-main-color"
                style={{ top: "-10px", left: "-10px" }}
              >
                {quantity}
              </div>
            </div>
          </div>
        </Link>
        
      </div>
      <MobileNav />
    </div>
  );
};

export default Navbar;