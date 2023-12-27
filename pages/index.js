import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import Featured from '@/components/Featured'
import styles from '../styles/Home.module.css'
import ShawarmaList from '@/components/ShawarmaList';
import { useState } from 'react';
import AddShawarmaBtn from '@/components/AddShawarmaBtn';
import AddModal from '@/components/AddModal';


const Index = ({ shawarmaList, admin }) => {
  const [closeModal, setCloseModal] = useState(true);
   
  return (
    <div className={styles.container}>
        <title>Pizza Restaurant in Lagos</title>
        <meta name='description' content='Best Pizza shop in town' />
        <Link rel='icon' href='/favicon.ico' />
      <Featured shawarmaList={shawarmaList}/>
      {admin && <AddShawarmaBtn setCloseModal={setCloseModal}/>}
      <ShawarmaList shawarmaList={shawarmaList}/>
      {!closeModal && <AddModal setCloseModal ={setCloseModal} />}
    </div>
  )
}

export default Index

export const getServerSideProps = async (context) => {
  const loginCookie = context.req?.cookies || "";
  let admin = false;

  if(loginCookie.token === process.env.TOKEN) {
    admin = true;
  }

  try{
    const res = await axios.get(`${process.env.ENDPOINT_URL}/api/products`);
  const data = (await res.data) || [];
  return {
    props: {
      shawarmaList:data,
      admin,
    }
    }
  }catch(err){
    console.error(err)
    return {
      props: {
      shawarmaList:[],
    }
  }
  }
}