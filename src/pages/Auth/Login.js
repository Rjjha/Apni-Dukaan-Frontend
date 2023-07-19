import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
//import "../../Styles/AuthStyles.css";
import { useNavigate,useLocation } from "react-router-dom";
import {useAuth} from "../../Context/Auth";

const Login = () => {
      const [email,setEmail] = useState("");
      const [password,setPassword] = useState("");
      const [auth,setAuth] = useAuth();
      const navigate = useNavigate();
      const location = useLocation();

      //form function
      const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`https://apni-dukaan-uccj.onrender.com/api/v1/auth/login`,{email,password});
            if(res && res.data.success)
            {
                toast.success(res && res.data.message);
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/");
            }
            else
            {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
      }
      
  return (
    <Layout title="Login - Apni Dukaan">
      <div className="form-container" style={{ minHeight: "70vh" }}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">Login Form</h4>
          <div className="mb-2">
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="mt-1">
          <button type="button" className="btn btn-primary" style={{backgroundColor:"blue", opacity:"0.5"}} 
          onClick={()=>{navigate("/forgot-password")}}>
            Forgot Password
          </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
