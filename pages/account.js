import { useEffect, useState } from "react";
import { firebaseApp } from "@/authentication/firebase-config";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "../styles/Cart.module.css";
import Image from "next/image";

const Dashboard = ({ userData }) => {
  const [firstName, setFirstName] = useState("");
  const [midddleName, setMidddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [residenceState, setResidenceState] = useState("");
  const [contact, setContact] = useState("");
  const [tab, setTab] = useState({
    profile: true,
    history: false,
    cartSummary: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const cart = useSelector(state => state.cart);
 

  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const uid = auth.currentUser?.uid;
  const handleLogout = async () => {
    await signOut(auth);
    cookie.remove("token");
    router.push("/login");
  };
  const displayTab = (paramState) => {
    setTab({
      profile: paramState == "profile",
      history: paramState == "history",
      cartSummary: paramState == "cartSummary",
    });
    return paramState;
  };

  const submitForm = async () => {
    try {
      const updateBody = {
        name: firstName + " " +  midddleName + " " + lastName,
        contact,
        address,
        state: residenceState
      };
      const res = await axios.put(`${process.env.ENDPOINT_URL}/api/users/${userData.authId}`, updateBody);
    } catch (error) {
      setError('Please fill all fields');
      console.error("error updating user profile", error);
    }
  };
  
  useEffect(() => {
    const autoFillForm = () => {
      if (!userData) {
        console.error("Error loading user-data from database");
        return;
      };

      const { name } = userData;
      if (name) {
        const nameArr = name.split(" ");
        firstName == "" ? setFirstName(nameArr[0]) : "";
        if (nameArr.length === 2){
          lastName == "" ? setLastName(nameArr[1]) : "";
        }
        if (nameArr.length === 3){
          midddleName == "" ? setMidddleName(nameArr[1]) : "";
          lastName == "" ? setLastName(nameArr[2]) : "";
        }        
      }
      contact == "" ? setContact(userData.contact) : "";
      address == "" ? setAddress(userData.address) : "";
      residenceState == "" ? setResidenceState(userData.state) : "";
      email == "" ? setEmail(userData.email) : "";
    };
    autoFillForm();
    return () => autoFillForm();
  }, [userData]);

  return (
    <div className="flex flex-col py-10 px-2 relative">
      <div className="mt-2">
        <div className="text-center text-5xl font-semibold p-2">Personal Details</div>
        <button
          className="absolute top-0 right-0 lg:right-48 mr-1 mt-1 lg:mr-4 bg-pink-700 text-white text-lg hover:scale-105 rounded-br-3xl rounded-tr-3xl py-3 lg:py-4 px-2 pr-4 lg:px-6 shadow-md border border-pink-400 font-semibold font-mono"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="inline-flex mr-2"/>
          <span>Logout</span>
        </button>
      </div>
      <div className="border-4 max-w-4xl container mx-auto my-10 ">
        {/* Navigation Tabs */}
        <ul className="flex flex-wrap items-center h-16 bg-gray-600 text-white font-normal text-xl">
          <li
            className="pr-2 h-16 w-1/3 hover:bg-gray-700 "
            style={{ backgroundColor: tab.profile ? "#374156" : "#4B5563" }}
          >
            <button
              className="py-2 px-4 h-16 w-full"
              onClick={() => displayTab("profile")}
            >
              Profile
            </button>
          </li>
          <li
            className="pr-2 h-16 w-1/3 hover:bg-gray-700"
            style={{ backgroundColor: tab.history ? "#374156" : "#4B5563" }}
          >
            <button
              className="py-2 px-4 h-16 w-full"
              onClick={() => displayTab("history")}
            >
              Purchase history
            </button>
          </li>
          <li
            className="pr-2 h-16 w-1/3 hover:bg-gray-700"
            style={{ backgroundColor: tab.cartSummary ? "#374156" : "#4B5563" }}
          >
            <button
              className="py-2 px-4 h-16 w-full"
              onClick={() => displayTab("cartSummary")}
            >
              Cart Summary
            </button>
          </li>
        </ul>
        {/* Tab Content */}
        <div className="px-1 pt-4 bg-white mx-1">
          {/* Home Tab Content */}
          <div className="tab-content">
            {tab.profile && (
              <div className="delay-300">
                <form className="mx-auto p-4 lg:p-6 pt-0 bg-white rounded-md text-lg">
                  <div className="text-red-500 text-sm mb-1 font-semibold font-mono">
                    {error ? error : 'All fields with * are required!'}
                  </div>
                  <div className=" block text-gray-700 border mx-auto mb-5"></div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">
                      First Name *
                    </label>
                    <input
                      className="border w-full px-3 py-2 focus:text-xl rounded-lg"
                      type="text"
                      placeholder="John"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Middle Name
                    </label>
                    <input
                      className="border rounded-lg w-full py-2 focus:text-xl px-3"
                      type="text"
                      placeholder="Doe"
                      onChange={(e) => {
                        setMidddleName(e.target.value);
                      }}
                      value={midddleName}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last name *
                    </label>
                    <input
                      className="border rounded-lg w-full py-2 focus:text-xl px-2"
                      type="text"
                      placeholder="Smith"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Email *
                    </label>
                    <input
                      className="border rounded-lg disabled:bg-gray-50 w-full py-2 focus:text-xl px-2 hover:outline-none"
                      type="text"
                      placeholder="Smith"
                      value={email}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phone Number *
                    </label>
                    <input
                      className="border rounded-lg w-full py-2 focus:text-xl px-3"
                      type="tel"
                      placeholder="0803-XXX-XXXX"
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                      value={contact}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Address *
                    </label>
                    <input
                      className="border rounded-lg w-full py-2 focus:text-xl px-3"
                      type="text"
                      placeholder="123 Main Street"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      State *
                    </label>
                    <input
                      className="border rounded-lg w-full py-2 focus:text-xl px-3"
                      type="text"
                      placeholder="123 Main Street"
                      onChange={(e) => {
                        setResidenceState(e.target.value);
                      }}
                      value={residenceState}
                    />
                  </div>
                </form>
              </div>
            )}
            {tab.history && (
              <div className="text-lg pl-1 min-h-[20vh] pt-10">
                <h1 className="px-2">You have no purchase history at the moment</h1>
              </div>
            )}
            {tab.cartSummary && (
              <div className="text-sm pl-1 min-h-[20vh] text-slate-700">
                {
                  cart.quantity > 0 ? (
                    <div className="w-full lg:flex-2 lg:pt-1">
                      <table
                        className="flex flex-col items-center justify-center lg:table w-100%"
                        style={{ borderSpacing: "20px" }}
                      >
                        <thead>
                          <tr className="hidden lg:table-row text-base">
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
                                <div className="h-[35vh] w-full lg:w-[120px] lg:h-[120px] relative">
                                  <Image
                                    src={product.img}
                                    layout="fill"
                                    objectFit="cover"
                                    alt=""
                                  className="lg:ml-30"/>
                                </div>
                              </td>
                              <td className="lg:text-center pl-[20vw] md:pl-[34vw] lg:pl-0 w-full lg:w-auto">
                                <span className="w-full text-24px lg:text-18px text-main-color font-medium ">
                                  {product.title}
                                </span>
                              </td>
                              <td className="pl-[20vw] md:pl-[34vw] lg:pl-0 w-full lg:w-auto lg:text-center">
                                <span className={`hidden lg:inline ${styles.extras}`}>
                                  {product.options.map((option) => (
                                    <span key={option._id}>{option.text}</span>
                                  ))}
                                </span>
                              </td>
                              <td className="pl-[20vw] md:pl-[34vw] lg:pl-0 w-full lg:w-auto lg:text-center">
                                <span className={styles.price}>₦{product.price}</span>
                              </td>
                              <td className="pl-[20vw] md:pl-[34vw] lg:pl-0 w-full lg:w-auto lg:text-center">
                                <span className={styles.quantity}>{product.quantity}</span>
                              </td>
                              <td className="pl-[20vw] md:pl-[34vw] lg:pl-0 w-full lg:w-auto lg:text-center">
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
                  ) : 
                  (
                    <h1>No items added to cart presently.</h1>
                  )
                }
              </div>
            )}
          </div>
        </div>
        {tab.profile ? (
          <button
            className="bg-green-700 hover:bg-green-800 text-white rounded-lg px-6 py-4 ml-20px font-bold text-lg font-mono m-1"
            onClick={submitForm}
          >
            Submit
          </button>
        ) : tab.history || tab.cartSummary ? (
          <button className="bg-green-700 hover:bg-green-800 text-white rounded-lg px-6 py-4 ml-20px font-bold text-lg font-mono mb-1">
            <Link
              href={"/products"}
              className=""
            >
              Order Now
            </Link>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const tokenStr = context.req?.cookies?.token;
    const token = tokenStr ? JSON.parse(tokenStr) : "";
    const uid = token ? token.user?.userId : '';
    if(!uid){
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      }     
    }
    const userData = await axios.get(`${process.env.ENDPOINT_URL}/api/users/${uid}`);
    return {
      props: {
        userData: userData.data
      }
    }
  } catch (err){
    console.error(err);
    return {
      props: {
        userData: null
      }
    }
  }
};

export default Dashboard;