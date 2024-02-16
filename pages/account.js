import { useEffect, useState } from "react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp, db } from "@/authentication/firebase-config";
import { useRouter } from "next/router";
import { updateUser, getUserById } from "@/HOFunctions/dbFunctions";
import cookie from "js-cookie";
import Link from "next/link";

const Dashboard = ({ userData }) => {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [residenceState, setResidenceState] = useState("");
  const [contact, setContact] = useState("");
  const [tab, setTab] = useState({
    profile: true,
    history: false,
    cartSummary: false,
  });
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
      await updateUser(db, "users", uid, {
        name: { firstname: fname, middlename: mname, lastname: lname },
        address,
        contact,
        state: residenceState,
      });
    } catch (error) {
      console.error("error updating user profile", error);
    }
  };
  useEffect(() => {
    const autoFillForm = () => {
      if (!userData) {
        console.error("Error loading user-data from database");
        return;
      }
      const { name, state } = userData;
      if (name) {
        const { firstname, middlename, lastname } = name;

        fname == "" ? setFname(firstname) : null;
        lname == "" ? setLname(lastname) : null;
        mname == "" ? setMname(middlename) : null;
      }
      contact == "" ? setContact(userData.contact) : null;
      address == "" ? setAddress(userData.address) : null;
      residenceState == "" ? setResidenceState(userData.state) : null;
    };
    autoFillForm();
    return () => autoFillForm();
  }, [userData]);

  return (
    <div className="flex flex-col py-10 px-2">
      <div className="relative">
        <div className="text-center text-3xl font-thin">Personal Profile</div>
        <div className="text-center font-semibold text-4xl">
          Welcome {fname}
        </div>
        <button
          className="absolute top-0 md:top-9 right-0 lg:right-56 mr-3 bg-red-700 hover:bg-red-800 text-white rounded-lg p-2"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
      <div className="border-4 max-w-4xl container mx-auto my-10 bg-gray-100">
        {/* Navigation Tabs */}
        <ul className="flex items-center h-12 bg-gray-600 text-white font-normal text-sm rounded-sm">
          <li
            className="pr-2 h-12 hover:bg-gray-700 "
            style={{ backgroundColor: tab.profile ? "#374151" : "#4B5563" }}
          >
            <button
              className="py-2 px-4 h-12"
              onClick={() => displayTab("profile")}
            >
              Profile
            </button>
          </li>
          <li
            className="pr-2 h-12 hover:bg-gray-700"
            style={{ backgroundColor: tab.history ? "#374151" : "#4B5563" }}
          >
            <button
              className="py-2 px-4 h-12"
              onClick={() => displayTab("history")}
            >
              Purchase history
            </button>
          </li>
          <li
            className="pr-2 h-12 hover:bg-gray-700"
            style={{ backgroundColor: tab.cartSummary ? "#374151" : "#4B5563" }}
          >
            <button
              className="py-2 px-4 h-12"
              onClick={() => displayTab("cartSummary")}
            >
              Cart Summary
            </button>
          </li>
        </ul>
        {/* Tab Content */}
        <div className="p-4 bg-white shadow">
          {/* Home Tab Content */}
          <div className="tab-content">
            {tab.profile && (
              <div className="delay-300">
                <form className="mx-auto p-2 bg-white shadow-md rounded-md">
                  <div className="text-red-500 text-sm mb-1">
                    All fields with * are required!
                  </div>
                  <div className=" block text-gray-700 border mx-auto mb-5"></div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1">
                      First Name *
                    </label>
                    <input
                      className="border rounded w-full px-3 py-1"
                      type="text"
                      placeholder="John"
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                      value={fname}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Middle Name
                    </label>
                    <input
                      className="border rounded w-full py-1 px-3"
                      type="text"
                      placeholder="Doe"
                      onChange={(e) => {
                        setMname(e.target.value);
                      }}
                      value={mname}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Last name *
                    </label>
                    <input
                      className="border rounded w-full py-1 px-2"
                      type="text"
                      placeholder="Smith"
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                      value={lname}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Phone Number *
                    </label>
                    <input
                      className="border rounded w-full py-1 px-3"
                      type="tel"
                      placeholder="555-555-5555"
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
                      className="border rounded w-full py-1 px-3"
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
                      className="border rounded w-full py-1 px-3"
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
              <div className="delay-300">
                You have no purchase history at the moment
                <br></br>
                You can order right now.
              </div>
            )}
            {tab.cartSummary && (
              <div>
                No items added to cart presently.
                <br></br>
                Order a delicioud shawarma now.
              </div>
            )}
          </div>
        </div>
        {tab.profile ? (
          <button
            className=" bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 ml-20px"
            onClick={submitForm}
          >
            Submit
          </button>
        ) : tab.history || tab.cartSummary ? (
          <Link
            href={"/products"}
            className=" bg-green-500 hover:bg-green-600 text-white rounded-lg p-2 ml-0"
          >
            Order Now
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const loginCookie = context.req?.cookies || "";
  const tokenString = loginCookie.token;
  let uid = "";

  if (!tokenString) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (tokenString) {
    const token = JSON.parse(tokenString);
    uid = token.user.userId;
    try {
      const userData = await getUserById("users", uid);
      return {
        props: {
          userData,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          userData: [],
        },
      };
    }
  }

  return {
    props: {
      userData: null,
    },
  };
};

export default Dashboard;
