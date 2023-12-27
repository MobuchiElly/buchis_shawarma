import styles from '../styles/Cart.module.css'
import OrderDetail from '@/components/OrderDetails';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
  } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { reset } from '@/redux/cartSlice';



const Cart = () => {
    const cart = useSelector((state) => state.cart);  
    const [showBtn, setShowbtn] = useState(false);
    const [cash, setCash] = useState(false);
    const dispatch = useDispatch();
    const amount = cart.total;
    const currency = "USD";
    const style = { layout: "vertical" };
    const router = useRouter();
    
    

    const createOrder = async (data) => {
      try {
        const res = await fetch(`${process.env.ENDPOINT_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!res.ok) {
          // Non-successful response 
          console.error('Order creation failed:', await res.json());
          return;
        }
        const responseData = await res.json();
        router.push('/orders/' + responseData._id);
        dispatch(reset());
      } catch (error) {
        console.log('Fetch Request Failed', error);
      }
    };
    
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    
        useEffect(() => {
          dispatch({
            type: "resetOptions",
            value: {
              ...options,
              currency: currency,
            },
          });
        }, [currency, showSpinner]);
    
        return (
          <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[amount, currency, style]}
              fundingSource={undefined}
              createOrder={(data, actions) => {
                return actions.order
                  .create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: currency,
                          value: amount,
                        },
                      },
                    ],
                  })
                  .then((orderId) => {
                    // Your code here after create the order
                    return orderId;
                  });
              }}
              onApprove={function (data, actions) {
                return actions.order.capture().then(function (details) {
                  const shipping = details.purchase_units[0].shipping;
                  createOrder({
                    customername: shipping.name.full_name,
                    address: shipping.address.address_line_1,
                    totalprice: cart.total,
                    paymentmethod: 1,
                  }) 
                });
              }}
            />
          </>
        );
      };    

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.trTitle}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {cart.products.map(product => (
                    <tbody key={product._id}>
                        <tr className={styles.tr}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image src={product.img} layout='fill' objectFit='cover' alt=''/>
                                </div>
                            </td>
                            <td>
                                <span className={styles.name}>{product.title}</span>
                            </td>
                            <td>
                                <span className={styles.extras}>
                                    {product.options.map((option) => (
                                        <span key={option._id}>{option.text}</span>
                                    ))}
                                </span>
                            </td>
                            <td>
                                <span className={styles.price}>${product.price}</span>
                            </td>
                            <td>
                                <span className={styles.quantity}>{product.quantity}</span>
                            </td>
                            <td>
                                <span className={styles.total}>${product.price * product.quantity}</span>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table>  
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>$0.00
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>${cart.total}
                </div>
                {showBtn ? (
                    <div className={`${styles.paymentMethods} flex flex-col mt-1`}>
                            <button className={`${styles.payButton} sm:px-3 sm:py-4 lg:px-2 lg:py-1 pointer mb-5 bg-white text-teal-700 font-bold rounded italic text-lg`} onClick={() => setCash(true)}>CASH ON DELIVERY</button>
                        <PayPalScriptProvider
                        options={{
                          "client-id":
                            "Acg4GmGNKB3toQolfcAyRwom7sS2Xec3HHy9uhxT7GZ0XOOXrIVhFtAyuoKwWsgdaELafyhjXltKX-1o",
                          components: "buttons",
                          currency: "USD",
                          "disable-funding": "credit,card,p24",
                        }}
                        >
                        <ButtonWrapper currency={currency} showSpinner={false}/>
                        </PayPalScriptProvider>
                    </div>
                ) : (
                    <button className={`${styles.button} bg-white rounded`} onClick={() => setShowbtn(true)}>CHECKOUT NOW!</button>
                )
                }
            </div>
        </div>
        {cash && ( 
          <OrderDetail totalprice={cart.total} createOrder={createOrder}/>
        )}
    </div>
  )
}

export default Cart