"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import MobileNav from "../components/MobileNav";
import { FadeLoader } from "react-spinners";
import {useState, useEffect} from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const content = {
    contact: {
      line1: "buchidevv@gmail.com",
      line2: "Phone: 08134923317",
    },
  };

  const handleRouteChangeStart = () => {
    setLoading(true);
  }
  const handleRouteChangeComplete = () => {
    setLoading(false);
  }
  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    }
  }, [router.events])
  

  return (
    <div className="flex justify-between items-center lg:p-x-15 lg:pr-4 lg:px-4 bg-main-bg-600 sticky top-0 h-m130 z-50 text-lg">
      
      <div className="hidden lg:flex lg:items-center lg:flex-3 flex-1">
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
      <div className="hidden lg:block" style={{ flex: 3 }}>
        <ul className="p-0 flex items-center justify-center list-none text-white">
          <Link href="/">
            <li className="font-my500 cursor-pointer m-5">Home</li>
          </Link>
          <Image src="/img/buchislogo.png" alt="logo" width="160" height="80" />
          <Link href="/contact-us">
            <li className="font-my500 cursor-pointer m-5">Contact</li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 flex justify-end items-center">
        <div className="hidden lg:inline-flex text-white font-my500 cursor-pointer pr-6 mr-6">
          <Link href="/account" className="text-main-color bg-white p-3 rounded-lg font-[700]">
            My Account
          </Link>
        </div>

        <Link href="/cart" className="absolute">
          <div className="last:justify-end mr-4 lg:mr-0">
            <Image src="/img/cart.png" alt="logo" width="30" height="30" />
            <div
              className={`absolute bg-white font-bold p-2 py-0 rounded-full p3 text-main-color ${quantity > 0 ? "animate-pulse" : ""}`}
              style={{ top: "-10px", left: "-13px" }}
            >
              {quantity}
            </div>
          </div>
        </Link>
      </div>
      <MobileNav quantity={quantity}/>
      {
        loading && <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
        <FadeLoader size={20}/>
      </div>
      }
    </div>
  );
};

export default Navbar;