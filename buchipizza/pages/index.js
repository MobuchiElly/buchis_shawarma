import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import Featured from '@/components/Featured'
import styles from '../styles/Home.module.css'
import PizzaList from '@/components/PizzaList';


const Index = ({ shawarmaList }) => {
  
  return (
    <div className={styles.container}>
        <title>Pizza Restaurant in Lagos</title>
        <meta name='description' content='Best Pizza shop in town' />
        <Link rel='icon' href='/favicon.ico' />
      <Featured shawarmaList={shawarmaList}/>
      <PizzaList shawarmaList={shawarmaList}/>
    </div>
  )
}

export default Index

export const getServerSideProps = async () => {

  try{
    const res = await axios.get("http://localhost:3000/api/products");
  const data = (await res.data) || [];
  return {
    props: {
      shawarmaList:data,
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