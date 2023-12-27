import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();
    const handleClickWithAxios = async () => {
        try{
            await axios.post(`https://localhost3000/api/login`, {
              username, password  
            });
            router.push("/admin");
        }catch(error){
           setError(true);
        }
    }
    
  return (
    <div className="h-calc-screen-minus-100 flex justify-center items-center">
        <div className="flex flex-col ">
            <h1 className="font-bold text-3xl mb-4">Admin Dashboard</h1>
            <input placeholder="username" onChange={(e) => {
                setUsername(e.target.value);
                setError(null);
            }} className="h-8 mb-5 px-3 py-1 rounded-md"/>
            <input placeholder="password" onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }} className="h-8 mb-8 px-3 py-1 rounded-md"/>
            <button className="h-8 mb-4 border-none bg-green-500 text-white font-bold pointer font-normal rounded-md text-center" onClick={handleClickWithAxios}>Sign In</button>
            {error && <div className="text-red-500 text-sm text-center">Wrong Login Credentials!!</div>}
        </div>
    </div>
  )
}

export default Login;