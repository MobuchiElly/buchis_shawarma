import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Featured from "@/components/Featured";
import ShawarmaList from "@/components/ShawarmaList";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";

const Index = ({ shawarmaList }) => {
  const [shawarmalist, setshawarmalist] = useState(shawarmaList?.slice(0, 12));
  const [closeModal, setCloseModal] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePage, setactivePage] = useState(1);
  
  const handlePagination = () => {
    if (activePage === 1){
      setshawarmalist(shawarmaList.slice(0, 12));
    } else if(activePage === 2){
      setshawarmalist(shawarmaList.slice(12));
    }
  }

  useEffect(() => {
    if(shawarmaList.length){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [shawarmaList]);
  useEffect(() => {
    handlePagination();
  }, [activePage]);
  return (
    <div>
      <title>Shawarma Restaurant in Lagos</title>
      <meta name="description" content="Best Shawarma online store in Lagos" />
      <Link rel="icon" href="/faviconbuchi.ico" />
      <Featured shawarmaList={shawarmalist} />
      <ShawarmaList shawarmaList={shawarmalist} loading={loading}/>
      <Pagination handlePagination={handlePagination} activePage={activePage} setactivePage={setactivePage}/>
    </div>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  try{
    const res = await axios.get(`${process.env.ENDPOINT_URL}/api/products`);
    const data = (await res.data) || [];
    return {
      props: {
        shawarmaList: data
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