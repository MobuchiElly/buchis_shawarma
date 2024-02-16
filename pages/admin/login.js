import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "@/authentication/firebase-config";
import { checkAdminStatus } from "@/HOFunctions/dbFunctions";


const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const auth = getAuth(firebaseApp);

  const handleSignIn = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      const uid = user.uid;
      if (user) {
        const userObj = {
          userId: uid,
          userToken: user.accessToken,
        };
        
        const isAdmin = await checkAdminStatus(uid);
        
        const token = {
          user: userObj,
          isAdmin,
        };
        const res = await axios.post(
          `${process.env.ENDPOINT_URL}/api/login`,
          {
            token,
          }
        );
        if (isAdmin) {
          router.push("/admin");
        } else {
          setError("Unauthorised Personnel");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("Wrong Login Credentials");
    }
  };

  return (
    <div className="h-calc-screen-minus-100 flex justify-center items-center bg-slate-100">
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl mb-4">Admin Dashboard</h1>
        <input
          placeholder="username"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          className="h-8 mb-5 px-3 py-1 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          className="h-8 mb-8 px-3 py-1 rounded-md"
        />
        <button
          className="h-8 mb-4 border-none bg-green-500 text-white font-bold pointer rounded-md text-center"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <div className="relative">
          {error && (
            <div className="text-red-500 text-sm text-center w-full absolute">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;