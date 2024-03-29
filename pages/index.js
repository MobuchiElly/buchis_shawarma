import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Featured from "@/components/Featured";
import ShawarmaList from "@/components/ShawarmaList";
import { useState, useEffect } from "react";
import AddShawarmaBtn from "@/components/AddShawarmaBtn";
import AddModal from "@/components/AddModal";
import useBodyScroll from "@/components/hooks";

const Index = ({ shawarmaList, admin }) => {
  const [closeModal, setCloseModal] = useState(true);
  const [mscroll, hideScroll, showScroll] = useBodyScroll();
  const [isActive, setIsActive] = useState(false);
  return (
    <div >
      <title>Shawarma Restaurant in Lagos</title>
      <meta name="description" content="Best Shawarma shop in town" />
      <Link rel="icon" href="/faviconbuchi.ico" />
      <Featured shawarmaList={shawarmaList} />
      {admin && (
        <AddShawarmaBtn hideScroll={hideScroll} setCloseModal={setCloseModal} />
      )}
      <ShawarmaList shawarmaList={shawarmaList} />
      {!closeModal && <AddModal setCloseModal={setCloseModal} />}
    </div>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const loginCookie = context.req?.cookies || "";
  let admin = false;
  const tokenString = loginCookie.token;

  if (tokenString) {
    const token = JSON.parse(loginCookie.token);
    admin = token.userToken && token.isAdmin ? true : false;
  }
  try {
    const res = await axios.get(`${process.env.ENDPOINT_URL}/api/products`);
    const data = (await res.data) || [];
    return {
      props: {
        shawarmaList: data,
        admin,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        shawarmaList: [],
      },
    };
  }
};
