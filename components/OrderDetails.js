import styles from '../styles/OrderDetails.module.css';
import { useState } from 'react';

const OrderDetail = ({ totalprice, createOrder }) => {
  const [customername, setCustomername] = useState('');
  const [address, setAddress] = useState('');
  const handleSubmit = () => {
    createOrder({ customername, address, totalprice, paymentmethod: 0 });
  }

  return (
    <div className="w-full h-screen  absolute top-0 left-0 flex justify-center items-center" style={{backgroundColor:"rgba(197, 197, 197, 0.568)", zIndex:"999"}}>
      <div className="w-500 bg-white rounded p-20">
        <h1 className='text-3xl mb-4 pb-1 font-extralight flex flex-col justify-center items-center'>
          You will pay ₦100 after delivery.
        </h1>
        <div className='flex flex-col w-100 mb-1.5'>
          <label className='mb-1 '>Name Surname</label>
          <input placeholder="Nick Doxa" type="text" className='rounded-md h-8' onChange={(e) => setCustomername(e.target.value)}/>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+234 813 xxx xxxx"
            className={`rounded-md ${styles.input}`}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="9 Ojoka street, Lagos"
            type="text"
            className={`rounded-md ${styles.textarea}`}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleSubmit}>
          Order
        </button>
      </div>
    </div>
  )
}

export default OrderDetail