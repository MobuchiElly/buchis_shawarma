import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp, db } from "@/authentication/firebase-config";
import { addUserToDb } from "@/HOFunctions/dbFunctions";
import FadeLoader from "react-spinners/FadeLoader";

const Login = ({ user }) => {
  const [fname, setFName] = useState(null);
  const [lname, setLName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userObj = {
        userId: user.uid,
        userToken: user.accessToken,
      };
      const token = { user: userObj };
      const res = await axios.post("/api/login", { token });
    }
  });
  const handleSignIn = async () => {
    if (!email && !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      if (user) {
        router.push("/account");
      }
    } catch (error) {
      error.code == "auth/network-request-failed" ? setError("Please check your internet conection") : error.code == "auth/invalid-credential" ? setError("Invalid Credentials") : setError("Please try again");
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    if (fname && email && password) {
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const id = userCred.user.uid;
        await addUserToDb(db, "users", id, {
          name: { firstname: fname, middlename: "", lastname: lname },
          email,
          password,
        });
        router.push("/account");
      } catch (error) {
        setError("Email already exists. Signup with a new email");
      }
    } else {
      setError("Please fill in all fields correctly");
    }
  };
  const handleToggle = () => {
    setIsUser(!isUser);
  };

  return (
    <div className="flex justify-center lg:items-center mt-[8vh] lg:mt-0" style={{height:'calc(100vh - 130px)'}}>
      <div className="flex flex-col border-2 border-slate-600 mx-4 md:mx-0 w-auto lg:w-[32vw] h-[55vh] px-5 py-10 rounded-tl-3xl rounded-br-3xl justify-center md:mb-6 mt-2">
        {isUser && (
          <h1 className="font-bold text-3xl text-center mb-6">Login</h1>
        )}
        {!isUser && (
          <h1 className="font-bold text-center text-3xl mb-6">Create Your Account</h1>
        )}
        {!isUser && (
          <div className="md:flex mb-3 md:mb-5 md:justify-between md:item-center gap-2">
            <input
              placeholder="John"
              onChange={(e) => {
                setFName(e.target.value);
                setError(null);
              }}
              className="px-3 py-2 rounded-lg w-100% md:w-50% mb-3 md:mb-0 bg-white text-lg focus:text-xl"
            />
            <input
              placeholder="Albert"
              onChange={(e) => {
                setLName(e.target.value);
                setError(null);
              }}
              className="px-3 py-2 rounded-lg w-full md:w-50% bg-transparent text-lg focus:text-xl"
            />
          </div>
        )}
        <input
          placeholder="example@mail.com"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          className="mb-3 md:mb-5 px-3 py-2 rounded-md bg-transparent text-lg focus:text-xl"
        />
        <input
          type="password"
          placeholder="password******23"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          className="mb-8 px-3 py-2 rounded-md bg-transparent text-lg focus:text-xl"
        />
        {isUser && (
          <button
            className="py-4 mb-4 border-none bg-green-600 hover:bg-green-700 p-1 delay-100 text-white font-bold pointer rounded-md text-center"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
        {!isUser && (
          <button
            className="mb-4 p-1 py-4 border-none bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-lg text-white font-bold pointer rounded-xl text-center"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        )}
        <div className="relative">
          {isUser && (
            <div className="text-center">
              Don&#39;t have an account?{" "}
              <button onClick={handleToggle} className="font-medium text-lg">
                Register now
              </button>
            </div>
          )}
          {!isUser && (
            <div className="text-center">
              I already have an account!{" "}
              <button onClick={handleToggle} className="font-medium text-lg">
                Login here
              </button>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-sm text-center absolute w-full">
              {error}
            </div>
          )}
        </div>
      </div>
      {
        loading && 
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-20">
          <FadeLoader size={20}/>
        </div>
      }
    </div>
  );
};

export default Login;
