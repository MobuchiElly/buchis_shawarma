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

const Login = ({ user }) => {
  const [fname, setFName] = useState(null);
  const [lname, setLName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
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
    if (email && password) {
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
        console.error("Error in credentials");
        setError("Incorrect credentials");
      }
    } else {
      setError("Wrong Credentials");
    }
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
    <div className="h-calc-screen-minus-100 bg-slate-200 flex justify-center items-center">
      <div className="flex flex-col border-2 border-slate-300 w-auto h-auto px-5 py-10 rounded-xl justify-center">
        {isUser && (
          <h1 className="font-bold text-3xl text-center mb-4">Account Login</h1>
        )}
        {!isUser && (
          <h1 className="font-bold text-center text-3xl mb-4">Register Now</h1>
        )}
        {!isUser && (
          <div className="md:flex mb-3 md:mb-5 md:justify-between md:item-center">
            <input
              placeholder="John"
              onChange={(e) => {
                setFName(e.target.value);
                setError(null);
              }}
              className="h-8 px-3 py-1 rounded-md w-100% md:w-50% mb-3 md:mb-0 bg-transparent"
            />
            <input
              placeholder="Albert"
              onChange={(e) => {
                setLName(e.target.value);
                setError(null);
              }}
              className="h-8 px-3 py-1 rounded-md w-full md:w-50% bg-transparent"
            />
          </div>
        )}
        <input
          placeholder="example@mail.com"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          className="h-8 mb-3 md:mb-5 px-3 md:py-1 rounded-md bg-transparent"
        />
        <input
          type="password"
          placeholder="password******23"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          className="h-8 mb-8 px-3 md:py-1 rounded-md bg-transparent"
        />
        {isUser && (
          <button
            className="h-8 mb-4 border-none bg-green-400 hover:bg-green-500 hover:text-lg delay-100 text-white font-bold pointer rounded-md text-center"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
        {!isUser && (
          <button
            className="h-8 mb-4 border-none bg-green-500 hover:bg-green-600 focus:outline-none focus:shadow-lg text-white font-bold pointer rounded-md text-center"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        )}

        <div className="relative">
          {isUser && (
            <div>
              Don&#39;t have an account?{" "}
              <button onClick={handleToggle} className="font-medium">
                Register now
              </button>
            </div>
          )}
          {!isUser && (
            <div>
              I already have an account!{" "}
              <button onClick={handleToggle} className="font-medium">
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
    </div>
  );
};

export default Login;
