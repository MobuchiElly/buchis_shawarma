import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import Featured from "@/components/Featured";
import ProductList from "@/components/ProductList";
import { useState, useEffect } from "react";
import AddShawarmaBtn from "@/components/AddShawarmaBtn";
import AddModal from "@/components/modals/AddModal";
import useBodyScroll from "@/components/hooks";

const Index = ({ shawarmaList }) => {
  const [closeModal, setCloseModal] = useState(true);
  const [mscroll, hideScroll, showScroll] = useBodyScroll();

  return (
    <div >
      <title>Shawarma Restaurant in Lagos</title>
      <meta name="description" content="Best Shawarma shop in town" />
      <Link rel="icon" href="/faviconbuchi.ico" />
      <ProductList shawarmaList={shawarmaList} />
    </div>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  try {
    const res = await axios.get(`${process.env.ENDPOINT_URL}/api/products`);
    const data = (await res.data) || [];
    return {
      props: {
        shawarmaList: data,
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