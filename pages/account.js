import { useEffect, useState } from "react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp, db } from "@/authentication/firebase-config";
import { useRouter } from "next/router";
import { updateUser, getUserById, getAllUsers } from "@/HOFunctions/dbFunctions";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
      
      const { name, state } = userData;
      if (name) {
        const { firstname, middlename, lastname } = name;
        fname == "" ? setFname(firstname) : "";
        lname == "" ? setLname(lastname) : "";
        mname == "" ? setMname(middlename) : "";
      }
      contact == "" ? setContact(userData.contact) : "";
      address == "" ? setAddress(userData.address) : "";
      residenceState == "" ? setResidenceState(userData.state) : "";
    };
    autoFillForm();
    return () => autoFillForm();
  }, [userData]);

  return (
    <div className="flex flex-col py-10 px-2 relative">
      <div className=" mt-2 lg:mt-0">
        <div className="text-center text-5xl font-semibold p-2">Personal Profile</div>
        <div className="text-center font-thin text-4xl capitalize p-2">
          Welcome {fname}
        </div>
        <button
          className="absolute top-0 md:top-[16vh] right-0 lg:right-60 mr-1 lg:mr-[7vw] bg-red-700 hover:bg-red-800 text-white text-lg rounded-lg lg:rounded-xl py-3 lg:py-4 px-3 lg:px-5 shadow-md border border-pink-400 font-semibold font-mono"
          onClick={handleLogout}
        >
          Logout
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
        <div className="p-4 pt-6 bg-white mx-1">
          {/* Home Tab Content */}
          <div className="tab-content">
            {tab.profile && (
              <div className="delay-300">
                <form className="mx-auto p-2 bg-white rounded-md text-lg">
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
                      className="border rounded-lg w-full py-2 focus:text-xl px-3"
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
                      className="border rounded-lg w-full py-2 focus:text-xl px-2"
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
                      className="border rounded-lg w-full py-2 focus:text-xl px-3"
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
                <h1 className="">You have no purchase history at the moment</h1>
              </div>
            )}
            {tab.cartSummary && (
              <div className="text-lg pl-1 pt-10 min-h-[20vh]">
                <h1>No items added to cart presently.</h1>
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
    try {
      const token = JSON.parse(tokenString);
      if (!token) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      uid = token.user.userId;
      const userData = await getUserById("users", uid);
      if(!uid) {
        return {
          redirect: {
            destination: "/login",
            permanent: false
          },
        }
      }
      if (userData){
        return {
          props: {
            userData,
          },
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: {
      userData: null,
    },
  };
};

export default Dashboard;