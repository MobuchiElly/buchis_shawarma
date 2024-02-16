import axios from "axios";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "@/authentication/firebase-config";
import Image from "next/image";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { db } from "../../authentication/firebase-config";
import cookie from "js-cookie";
import { getAllAdminUsers, getAllUsers } from "@/HOFunctions/dbFunctions";
import EditModal from "@/components/EditModal";

const Index = ({ orders, products, users, adminUsers }) => {
  const [productsList, setProductsList] = useState(products);
  const [ordersList, setOrdersList] = useState(orders);
  const [allUsers, setAllUsers] = useState(users);
  const [adminList, setAdminList] = useState(adminUsers);
  const [openModal, setOpenModal] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const status = ["preparing", "on the way", "delivered"];
  const auth = getAuth();
  const router = useRouter();
  const [tab, setTab] = useState({
    products: true,
    orders: false,
    users: false,
    admins: false,
  });

  const handleLogout = async () => {
    await signOut(auth);
    //cookie.remove(token);
    router.push("/login/admin");
  };

  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(
        `${process.env.ENDPOINT_URL}/api/products/${productId}/`
      );
      setProductsList(productsList.map((product) => product._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (productId) => {
    try {
      const res = await axios.put(
        `${process.env.ENDPOINT_URL}/api/products/${productId}/`
      );
      setProductsList(
        productsList.filter((product) =>
          product._id === productId ? res.data : product
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id) => {
    const currentOrder = ordersList.filter((order) => order._id === id)[0];
    const currentStatus = currentOrder.status;

    try {
      const res = await axios.put(
        `${process.env.ENDPOINT_URL}/api/orders/${id}`,
        { status: currentStatus + 1 }
      );
      setOrdersList([
        res.data,
        ...ordersList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const displayTab = (paramState) => {
    setTab({
      products: paramState == "products",
      orders: paramState == "orders",
      users: paramState == "users",
      admins: paramState == "admins",
    });
    return paramState;
  };

  const handleUser = async (user) => {
    setOpenModal(true);
    setUserDetail(user);
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex flex-col py-10 px-2">
        <div className="relative">
          <div className="text-center font-semibold text-4xl">
            Welcome Admin
          </div>
          <button
            className="absolute top-9 right-56 mr-3 bg-red-700 text-white rounded-lg p-2"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
        <div className="border-4 max-w-4xl container mx-auto my-10 bg-gray-100">
          {/* Navigation Tabs */}
          <ul className="flex items-center h-12 bg-gray-600 text-white font-normal text-sm rounded-sm ">
            <li
              className="pr-2 h-12 hover:bg-gray-700"
              style={{ backgroundColor: tab.products ? "#374151" : "#4B5563" }}
            >
              <button
                className="py-2 px-4 h-12"
                onClick={() => displayTab("products")}
              >
                Products
              </button>
            </li>
            <li
              className="pr-2 h-12 hover:bg-gray-700"
              style={{ backgroundColor: tab.orders ? "#374151" : "#4B5563" }}
            >
              <button
                className="py-2 px-4 h-12"
                onClick={() => displayTab("orders")}
              >
                Orders
              </button>
            </li>
            <li
              className="pr-2 h-12 hover:bg-gray-700"
              style={{ backgroundColor: tab.users ? "#374151" : "#4B5563" }}
            >
              <button
                className="py-2 px-4 h-12"
                onClick={() => displayTab("users")}
              >
                Manage users
              </button>
            </li>
            <li
              className="pr-2 h-12 hover:bg-gray-700"
              style={{ backgroundColor: tab.admins ? "#374151" : "#4B5563" }}
            >
              <button
                className="py-2 px-4 h-12"
                onClick={() => displayTab("admins")}
              >
                Admin users
              </button>
            </li>
          </ul>
          {/* Tab Content */}
          <div className="p-4 bg-white shadow">
            {/* Home Tab Content */}
            <div className="tab-content delay-200">
              {tab.products && (
                <div className="flex-1 delay-200">
                  <h1 className="text-3xl font-bold mb-4 text-center">
                    Manage Products
                  </h1>
                  <table className="w-100 border-spacing-2 text-left">
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
                            <Image
                              src={product.img}
                              width={50}
                              height={50}
                              style={{ objectFit: "cover" }}
                              alt="shawarma image"
                            />
                          </td>
                          <td>{product._id.slice(0, 5) || null}...</td>
                          <td>{product.title}</td>
                          <td>{product.prices[0]}</td>
                          <td>
                            <button
                              className="p-2 pointer border-none text-white bg-teal-600 mr-7"
                              onClick={handleEdit}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 pointer border-none text-white bg-crimson-800"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
              {tab.orders && (
                <div className="flex-1 w-full">
                  <h1 className="text-3xl font-bold mb-4 text-center">
                    Manage Orders
                  </h1>
                  <table className="w-100 border-spacing-2 text-left">
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
                            {order.paymentmethod === 0 ? (
                              <span>cash</span>
                            ) : (
                              <span>paid</span>
                            )}
                          </td>
                          <td>{status[order.status]}</td>
                          <td>
                            <button
                              className="p-3 pointer bg-slate-100 m-1"
                              onClick={() => handleStatus(order._id)}
                            >
                              Next stage
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
              {tab.users && (
                <div>
                  <h1 className="text-3xl font-bold mb-4 text-center">
                    Manage Users
                  </h1>
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300">Image</th>
                        <th className="border border-gray-300">User</th>
                        <th className="border border-gray-300">Type</th>
                        <th className="border border-gray-300">Lock</th>
                        <th className="border border-gray-300">Registered</th>
                        <th className="border border-gray-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="border border-gray-300 pl-4">
                            {" "}
                            user image here
                          </td>
                          <td className="border border-gray-300 pl-4">
                            <span className="block">
                             {`${user.name?.firstname} ${user.name?.lastname}`}
                            </span>
                            <span className="block">{user.email}</span>
                            <span className="block">08134923317</span>
                            <span className="block">D.O.B: null null null</span>
                          </td>
                          <td className="border border-gray-300 pl-4">
                            {user.isAdmin ? "admin" : "user"}
                          </td>
                          <td className="border border-gray-300 pl-4">
                            {user.isLocked ? "Yes" : "No"}
                          </td>
                          <td className="border border-gray-300 pl-4">
                            Reg Date appears here
                          </td>
                          <td className="border border-gray-300 pl-4">
                            <button
                              className="bg-gray-500 text-white p-1 px-2"
                              onClick={() =>
                                handleUser({
                                  userId: user.id,
                                  isAdmin: user.isAdmin || null,
                                })
                              }
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {tab.admins && (
                <div>
                  <h1 className="text-3xl font-bold mb-4 text-center">
                    Manage Admins
                  </h1>
                  <table className="min-w-full border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300">Image</th>
                        <th className="border border-gray-300">User</th>
                        <th className="border border-gray-300">Lock</th>
                        <th className="border border-gray-300">Registered</th>
                        <th className="border border-gray-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminList.map((user) => (
                        <tr key={user.id}>
                          <td className="border border-gray-300 pl-4">
                            {" "}
                            user image here
                          </td>
                          <td className="border border-gray-300 pl-4">
                            <span className="block">Buchi Ugwu</span>
                            <span className="block">{user.email}</span>
                            <span className="block">08134923317</span>
                            <span className="block">D.O.B: null null null</span>
                          </td>
                          <td className="border border-gray-300 pl-4">
                            {user.isLocked ? "Yes" : "No"}
                          </td>
                          <td className="border border-gray-300 pl-4">
                            Reg Date appears here
                          </td>
                          <td className="border border-gray-300 pl-4">
                            <button
                              className="bg-gray-500 text-white p-1 px-2"
                              onClick={() =>
                                handleUser({
                                  userId: user.id,
                                  isAdmin: user.isAdmin || null,
                                })
                              }
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <EditModal userDetail={userDetail} closeModal={closeModal} />
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const loginCookie = context.req?.cookies;
  const tokenString = loginCookie.token;

  const token = tokenString ? JSON.parse(tokenString) : null;

  if (!token || !token.user.userToken || !token.isAdmin) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  try {
    const orderRes = await axios.get(`${process.env.ENDPOINT_URL}/api/orders`);
    const productRes = await axios.get(
      `${process.env.ENDPOINT_URL}/api/products`
    );
    const users = await getAllUsers(db, "users");
    const adminUsers = await getAllAdminUsers(db, "users");

    return {
      props: {
        orders: orderRes.data,
        products: productRes.data,
        users,
        adminUsers,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        orders: [],
        products: [],
        users: [],
        adminUsers: [],
      },
    };
  }
};

export default Index;
