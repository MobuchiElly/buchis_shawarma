import axios from "axios";
import { firebaseApp } from "@/authentication/firebase-config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import EditModal from "@/components/modals/EditModal";
import AddShawarmaBtn from "@/components/AddShawarmaBtn";
import AddModal from "@/components/modals/AddModal";
import EditProductModal from "@/components/modals/EditProductModal";

const Index = ({ orders, products, users, adminUsers, adminAuthId }) => {
  const [productsList, setProductsList] = useState(products);
  const [ordersList, setOrdersList] = useState(orders);
  const [allUsers, setAllUsers] = useState(users);
  const [adminList, setAdminList] = useState(adminUsers);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
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
  const [open, setOpen] = useState(false);
  
  const handleLogout = async () => {
    await signOut(auth);
    cookie.remove("token");
    router.push("/admin/login");
  };

  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(
        `${process.env.ENDPOINT_URL}/api/products/${productId}/`, { headers: { Authorization: `Bearer ${adminAuthId}`}});
      setProductsList(productsList.map((product) => product._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (productId) => {    
    const product = productsList.find((product) => product._id === productId);
    product ? setEditedProduct(product) : null;
    setEditingProduct(true)
    editedProduct ? setEditingProduct(true) : null;
    try {
      // const res = await axios.put(
      //   `${process.env.ENDPOINT_URL}/api/products/${productId}/`
      // );
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
    <div className="min-h-screen">
      <div className="flex flex-col py-10 px-2">
        <div className="relative">
          <div className="text-center font-semibold text-4xl mt-1 lg:mt-0">
            Welcome Admin
          </div>
          <button
            className="absolute top-neg-12 lg:top-9 right-0 lg:right-80 mr-12 bg-red-700 text-white rounded-lg p-2 px-3 font-[600]"
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
        <div className="border-4 max-w-4xl container mx-auto my-6 lg:my-10 bg-gray-100">
          {/* Navigation Tabs */}
          <ul className="flex justify-around items-center h-12 bg-gray-600 text-white font-normal text-sm rounded-sm ">
            <li
              className="h-12 hover:bg-gray-700"
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
          <div className="relative p-4 bg-white shadow">
            {/* Home Tab Content */}
            <div className="tab-content delay-200 pl-2 md:pl-4 ">
              {tab.products && (
                <div className="delay-200 overflow-x-auto">
                  <h1 className="text-3xl font-bold mb-4 text-center">
                    Manage Products
                  </h1>
                  <AddShawarmaBtn setOpen={setOpen} />
                  <table className="w-full border-spacing-2 text-left ">
                    <tbody className="">
                      <tr className="">
                        <th>Image</th>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </tbody>
                    {productsList.map((product) => (
                      <tbody key={product._id} className=''>
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
                          <td className="flex">
                            <button
                              className="p-2 px-3 pointer border-none text-white bg-teal hover:bg-teal-700 font-semibold mr-4 lg:mr-7 shadow-md rounded"
                              onClick={() => handleEdit(product._id)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 pointer border-none text-white font-semibold rounded bg-crimson-800 hover:bg-crimson-900"
                            >
                              Delete product
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  {open && <AddModal setOpen={setOpen} />}
                </div>
              )}
              {tab.orders && (
                <div className="w-full overflow-x-auto">
                  <h1 className="text-3xl font-bold mb-4 text-center">
                    Manage Orders
                  </h1>
                  <table className="w-full border-spacing-2 text-left ">
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
                <div className="overflow-x-auto">
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
                                handleUser(user)
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
                <div className="overflow-x-auto">
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
        <EditModal userDetail={userDetail} adminAuthId={adminAuthId} closeModal={closeModal} />
      )}
      {
        editingProduct && 
        <EditProductModal product={editedProduct} closeModal={() => setEditingProduct(false)}/>
      }
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const tokenStr = context.req?.cookies?.token;
    const token = tokenStr ? JSON.parse(tokenStr) : "";
    if (!token || !token.user.userToken || !token.isAdmin) {
      return {
        redirect: {
          destination: "/admin/login",
          permanent: false,
        },
      };
    };
    // confirm adminStatus
    const admin = token.isAdmin;
    const uid = token.user.userId;
    //Fetch orders
    const orderRes = await axios.get(`${process.env.ENDPOINT_URL}/api/orders`);
    //Fetch products
    const productRes = await axios.get(
      `${process.env.ENDPOINT_URL}/api/products`
    );
    
    const userData = await axios.get(`${process.env.ENDPOINT_URL}/api/users/${uid}`);
    const authId = await userData?.data?.authId;
    let users = null;
      if(authId){
        users = await axios.get(`${process.env.ENDPOINT_URL}/api/users`, { headers: {Authorization: `Bearer ${authId}`}});
      };
    const adminUsers = users.data.filter(user => user.isAdmin === true);
    return {
      props: {
        orders: orderRes.data,
        products: productRes.data,
        users: users.data,
        adminUsers,
        adminAuthId: authId
      },
    };
  } catch (error) {
    console.error("An error occurred:", error);
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