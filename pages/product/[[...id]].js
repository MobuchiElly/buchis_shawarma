import styles from '../../styles/Product.module.css';
import Image from 'next/image'
import { useState } from 'react';
import PizzaCard from '@/components/ShawarmaCard';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';

const Product = ({ shawarma }) => {
  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(shawarma.prices[0])
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => {
    state.cart.quantity;
  });

  const changePrice = (num) => {
    setPrice(price + num);
  }
  const handleSize = (sizeIndex) => {
    const diff = shawarma.prices[sizeIndex] - shawarma.prices[size];
    setSize(sizeIndex);
    changePrice(diff);
  }
  const handleChange = (e, option) => {
    if(e.target.checked) {
      changePrice(option.price);
      setOptions(prev => [...prev, option])
    }else{
      changePrice(-option.price);
      setOptions(options.filter(extra => extra._id !== option._id))
    }
  }

  const handleOrder = () => {
    dispatch(addProduct({...shawarma, options, price, quantity}));
  }

  return (
    <div className={`${styles.container} h-auto lg:h-calc-screen-minus-100 flex flex-col lg:flex-row  text-center lg:text-justify sm:mt-20px lg-mt-1`}>
        <div className='flex-1 h-100% flex items-center justify-center'>
        <div className='w-70vw h-70vw lg:w-80% lg:h-80% relative'>
          <Image src={shawarma.img} fill={true} alt=""/>
        </div>
        </div>
        <div className='flex-1 flex flex-col justify-center items-center p-20'>
          <h1 className='font-700 text-24px mt-3 uppercase'>{shawarma.title}</h1> 
          <span className='text-main-color text-24px font-400 m-5 md:m-0' style={{borderBottom:'1px solid #d1411e'}}>₦{price}</span>
          <p className={styles.desc}>{shawarma.desc}</p>
          <h3 className='font-semibold text-xl mt-5 pb-2'>Choose the size</h3>
          <div className='flex justify-between w-100% lg:w-40% sm:px-4 sm:py-0 lg:px-0px lg:py-0px' >
            <div className='cursor-pointer relative w-30px h-30px' onClick={() => handleSize(0)}>
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className='absolute text-xss text-white bg-teal rounded-md' style={{top:'-5px', right:'-20px', padding:'0 5px'}}>Small</span>
            </div>
            <div className='cursor-pointer relative w-40px h-40px' onClick={() => handleSize(1)}>
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className='absolute text-xss text-white bg-teal rounded-md' style={{top:'-5px', right:'-20px', padding:'0 5px'}}>Medium</span>
            </div>
            <div className='cursor-pointer relative w-50px h-50px' onClick={() => handleSize(2)}>
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className='absolute text-xss text-white bg-teal rounded-md' style={{top:'-5px', right:'-20px', padding:'0 5px'}}>Large</span>
            </div>
          </div>
          <h3 className={styles.choose}>Choose additional ingredient</h3>
          <div className='flex flex-col mb-3'> 
            {shawarma.extraOptions.map(option => (
              <div className='flex items-center mr-1 text-18px lg:text-14px font-my500 sm:m-1 ' style={{marginRight:'10px'}} key={shawarma._id}>
              <input type="checkbox" id={option.text} name={option.text} className='w-25px lg:w-20px h-25px lg:h-20px' onChange={(e) => handleChange(e, option)}/>
              <label htmlFor='double' className='p-1'>{option.text}</label>
            </div>
            ))}
          </div>
          <div className='container flex justify-center'>
            <input type='number' value={quantity} min='0' className=' sm:h-50px w-50px lg:h-8 rounded indent-2' onChange={(e) => setQuantity(e.target.value)}/>

            <button onClick={handleOrder} className={`${styles.button} bgmain bg-main-bg-600 text-white border-none font-medium cursor-pointer ml-10px px-2 text-center sm:h-50px lg:h-8 `}>Add to Cart</button>
          </div>
        </div>
    </div> 
  )
}

export default Product

export const getServerSideProps = async ({params}) => {
  
  const res = await fetch(`${process.env.ENDPOINT_URL}/api/products/${params.id}`);
  const shawarma = await res.json();
  
  return {
    props:{
      shawarma,
    }
  }
}