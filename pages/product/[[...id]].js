import styles from '../../styles/Product.module.css';
import Image from 'next/image'
import { useState } from 'react';
import PizzaCard from '@/components/ShawarmaCard';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';

const Product = ({ shawarma }) => {
  const [size, setSize] = useState(0)
  const [price, setPrice] = useState(shawarma.prices[0])
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch();

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
    dispatch(addProduct({...shawarma, options, price, quantity}))
  }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={shawarma.img} fill={true} alt=""/>
        </div>
        </div>
        <div className={styles.right}>
          <h1 className={`${styles.title} uppercase`}>{shawarma.title}</h1> 
          <span className={styles.price}>#{price}</span>
          <p className={styles.desc}>{shawarma.desc}</p>
          <h3 className={styles.choose}>Choose the size</h3>
          <div className={styles.sizes}>
            <div className={styles.size} onClick={() => handleSize(0)}>
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className={styles.number} >Small</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(1)}>
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className={styles.number} >Medium</span>
            </div>
            <div className={styles.size} onClick={() => handleSize(2)}>
              <Image src="/img/size.png" layout="fill" alt="" />
              <span className={styles.number} >Large</span>
            </div>
          </div>
          <h3 className={styles.choose}>Choose additional ingredient</h3>
          <div className={styles.ingredients}>
            {shawarma.extraOptions.map(option => (
              <div className={styles.option} key={shawarma._id}>
              <input type="checkbox" id={option.text} name={option.text} className={styles.checkbox} onChange={(e) => handleChange(e, option)}/>
              <label htmlFor='double'>{option.text}</label>
            </div>
            ))}
          </div>
          <div className={styles.add}>
            <input type='number' value={quantity} className={`${styles.quantity} rounded`} onChange={(e) => setQuantity(e.target.value)}/>
            <button className={`${styles.button} p-1 rounded`} onClick={handleOrder}>Add to Cart</button>
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