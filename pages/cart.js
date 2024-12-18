import styles from "../styles/Cart.module.css";
import OrderDetails from "@/components/OrderDetails";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { reset } from "@/redux/cartSlice";
import useBodyScroll from "@/components/hooks";
import Link from "next/link";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [showBtn, setShowbtn] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const amnt = cart.total / 1250;
  const amount = amnt;
  const currency = "USD";
  const style = { layout: "vertical" };
  const router = useRouter();
  const [mscroll, showScroll, hideScroll] = useBodyScroll();
  
  const createOrder = async (data) => {
    try {
      const res = await fetch(`${process.env.ENDPOINT_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Non-successful response
        console.error("Order creation failed:", await res.json());
        return;
      }
      const responseData = await res.json();
      router.push("/orders/" + responseData._id);
      dispatch(reset());
    } catch (error) {
      console.log("Fetch Request Failed", error);
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
              });
            });
          }}
        />
      </>
    );
  };

  const closeForm = () => {
    setCash(false);
    showScroll();
  };

  return (
    <div className="min-h-[70vh]">
      { cart.quantity > 0 ?
        (<div className="flex flex-col px-2 py-20 lg:p-50px lg:flex-row">
        <div className="w-full lg:flex-2 lg:pt-6">
            <table
              className="flex flex-col items-center justify-center lg:table w-100%"
              style={{ borderSpacing: "20px" }}
            >
              <thead>
                <tr className="hidden lg:table-row">
                  <th>Product</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              {cart.products.map((product) => (
                <tbody key={product._id} className=" w-full">
                  <tr
                    className="flex flex-col items-center justify-center mb-4 lg:mb-0 lg:table-row"
                    style={{ marginBottom: "20px" }}
                  >
                    <td className=" w-full lg:table-row">
                      <div className="h-[35vh] w-full lg:w-m100 lg:h-m100 relative">
                        <Image
                          src={product.img}
                          layout="fill"
                          objectFit="cover"
                          alt="product image"
                        className="lg:ml-30"/>
                      </div>
                    </td>
                    <td className="lg:text-center pl-[14vw] lg:pl-0 w-full lg:w-auto">
                      <span className="w-full text-24px lg:text-18px text-main-color font-medium ">
                        {product.title}
                      </span>
                    </td>
                    <td className="pl-[14vw] lg:pl-0 w-full lg:w-auto lg:text-center">
                      <span className={styles.extras}>
                        {product.options.map((option) => (
                          <span key={option._id}>{option.text}</span>
                        ))}
                      </span>
                    </td>
                    <td className="pl-[14vw] lg:pl-0 w-full lg:w-auto lg:text-center">
                      <span className={styles.price}>₦{product.price}</span>
                    </td>
                    <td className="pl-[14vw] lg:pl-0 w-full lg:w-auto lg:text-center">
                      <span className={styles.quantity}>{product.quantity}</span>
                    </td>
                    <td className="pl-[14vw] lg:pl-0 w-full lg:w-auto lg:text-center">
                      <span
                        className={`${styles.total} text-21px lg:text-18px font-medium`}
                      >
                        ₦{product.price * product.quantity}
                      </span>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
        </div>
        <div className="flex-1 lg:mt-4">
          <div className="w-100% lg:w-90% bg-#333 px-10 py-7 flex flex-col justify-center text-white h-auto min-h-300px border">
            <h2 className="font-bold text-lg mb-2">CART TOTAL</h2>
            <div className="mb-1">
              <b className="hidden lg:inline">Subtotal: </b>₦{cart.total}
            </div>
            <div className="mb-1">
              <b className="hidden lg:inline">Discount: </b>₦0.00
            </div>
            <div className="mb-1">
              <b className="hidden lg:inline">Total:</b>₦{cart.total}
            </div>
            {showBtn && (
              <div className="flex flex-col mt-1 z-10 relative">
                <button
                  className="sm:px-3 py-2 lg:px-2 lg:py-1 pointer mb-5 bg-white text-teal-700 font-bold rounded italic text-lg"
                  onClick={() => {
                    setCash(true);
                    hideScroll();
                  }}
                >
                  CASH ON DELIVERY
                </button>
                
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        process.env.NEXT_PUBLIC_PAYPALCLIENTID,
                      components: "buttons",
                      currency: "USD",
                      "disable-funding": "credit,card,p24",
                    }}
                    className="absolute"
                  >
                    <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
              </div>
            )}
            {!showBtn && (
              <button
                className={` bg-white rounded text-main-color cursor-pointer mt-20px font-bold p-3`}
                onClick={() => {
                  setTimeout(() => {
                    setShowbtn(true)
                  }, 1000);
                }}
              >
                CHECKOUT NOW!
              </button>
            )}
          </div>
        </div>
        </div>) : (
            <div className="my-2 lg:my-20">
              <div className="flex justify-center">
                <Image src="/img/emptyCart.png" height="300" width="300"/>
              </div>
              <div className="lg:text-center font-semibold font-serif">
                <span className="block text-xl text-center">Ooops!!!</span>
                <p className="mr-3 lg:inline-flex text-center">It appears you have no items added to cart presently</p>
              </div>
            </div>
        )
      }
      {cash && (
        <OrderDetails
          closeForm={closeForm}
          totalprice={cart.total}
          createOrder={createOrder}
        />
      )}
    </div>
  );
};

export default Cart;

export const getServerSideProps = (context) => {
  try {
    const tokenStr = context.req?.cookies?.token;
    const token = tokenStr ? JSON.parse(tokenStr) : "";
    const uid = token ? token.user?.userId : "";
    if (!uid){
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }
  } catch(error) {
    console.error(error);
  }
  return {
    props: {
    }
  }
}