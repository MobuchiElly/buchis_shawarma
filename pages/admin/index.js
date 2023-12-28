import styles from '../../styles/Admin.module.css';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { redirect } from 'next/navigation';

const Index = ({ orders, products }) => {
    const [productsList, setProductsList] = useState(products);
    const [ordersList, setOrdersList] = useState(orders);
    const status = ["preparing", "on the way", "delivered"];

    const handleDelete = async (productId) => {
        try{
            const res = await axios.delete(`${process.env.ENDPOINT_URL}/api/products/${productId}/`);
            setProductsList(productsList.filter((product) => product._id !== productId));
            
        }catch(error){
            console.log(error);
        }
    }

    const handleStatus = async (id) => {
        const currentOrder= ordersList.filter((order) => order._id === id)[0];
        const currentStatus = currentOrder.status;

        try{
            const res = await axios.put(`${process.env.ENDPOINT_URL}/api/orders/${id}`, {status: currentStatus + 1});
            setOrdersList([res.data, ...ordersList.filter((order) => order._id !== id)]);
        }catch(error){
            console.log(error);
        }
    }
   
  return (
    <div className='p-5 flex'>
      <div className='flex-1'>
        <h1>Products</h1>
        <table className='w-100 border-spacing-2 text-left'>
            <tbody>
                <tr>
                    <th>Image</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </tbody>
            
                {productsList.map((product) => (
                    <tbody key={product._id}>
                        <tr>
                        <td>
                            <Image src={product.img} width={50} height={50} style={{objectFit:'cover'}} alt="shawarma image"/>
                        </td>
                        <td>{product._id.slice(0, 5)}...</td>
                        <td>{product.title}</td>
                        <td>{product.prices[0]}</td>
                        <td>
                            <button className='p-2 pointer border-none text-white bg-teal-600 mr-7'>Edit</button>
                            <button onClick={() => handleDelete(product._id)} className='p-2 pointer border-none text-white bg-crimson-800' >Delete</button>
                        </td>
                                        </tr>
                    </tbody>
                ))} 
        </table>
      </div>


      <div className='flex-1'>
        <h1>Orders</h1>
        <table className='w-100 border-spacing-2 text-left'>
            <tbody>
                <tr>
                    <th>Id</th>
                    <th>Customer</th>
                    <th>TotalPrice</th>
                    <th>PaymentMethod</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </tbody>
            {ordersList.map((order) => (
                <tbody key={order._id}>
                <tr>
                    <td>{order._id.slice(0, 5)}...</td>
                    <td>{order.customername}</td>
                    <td>₦{order.totalprice}</td>
                    <td>
                        {
                            order.paymentmethod === 0 ? (<span>cash</span>) : (<span>paid</span>)
                        }
                    </td>
                    <td>{status[order.status]}</td>
                    <td>
                        <button className='p-3 pointer bg-slate-100 m-1' onClick = {() => handleStatus(order._id)}>Next stage</button>
                    </td>  
                </tr>
            </tbody>    
            ))} 
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
        const loginCookie = context.req?.cookies || "";
        
        if(loginCookie.token !== process.env.TOKEN){
            console.log("Invalid token detected. Redirecting to /admin/login.");
            return {
                redirect: {
                    destination:"/admin/login",
                    permanent:false,
                },
            }
        }


    const orderRes = await axios.get(`${process.env.ENDPOINT_URL}/api/orders`);
    const productRes = await axios.get(`${process.env.ENDPOINT_URL}/api/products`);

    return {
        props:{
            orders: orderRes.data,
            products: productRes.data,
        }
    }
}

export default Index