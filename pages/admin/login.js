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
import { useDispatch } from "react-redux";
import { FadeLoader } from "react-spinners";


const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch;

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      const uid = user.uid;
      
      if (user) {
        const userObj = {
          userId: uid,
          userToken: user.accessToken,
        };
        
        const isAdmin = await checkAdminStatus(uid);
        console.log(isAdmin)
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
      };setLoading(false);
    } catch (error) {
      setLoading(false);
     error.code == "auth/network-request-failed" ? setError("Please check your internet conection") : error.code == "auth/invalid-credential" ? setError("Invalid Credentials") : setError("Please try again");
    }
  };

  return (
    <div className="bg-white flex justify-center lg:items-center mt-[8vh] lg:mt-0" style={{height:'calc(100vh - 130px)'}}>
      <div className="flex flex-col shadow lg:w-[32vw] h-[50vh] border-2 border-slate-300 px-5 py-8  rounded-xl justify-center bg-slate-100">
        <h1 className="font-bold text-3xl mb-4 text-center">Admin Dashboard</h1>
        <input
          placeholder="username"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          className="h-10 mb-5 px-3 py-1 rounded-md text-lg focus:text-xl"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          className="h-10 mb-8 px-3 py-1 rounded-md text-lg focus:text-xl"
        />
        <button
          className="py-4 px-2 mb-4 border-none bg-green-600 text-white font-bold pointer rounded-xl text-lg text-center hover:bg-green-700"
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
      {
        loading && 
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center">
           <FadeLoader size={20}/> 
        </div>
      }
    </div>
  );
};

export default Login;