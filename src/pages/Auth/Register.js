import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import "../../Styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
      const [name,setName] = useState("");
      const [email,setEmail] = useState("");
      const [phone,setPhone] = useState("");
      const [address,setAddress] = useState("");
      const [question,setQuestion] = useState("");
      const [password,setPassword] = useState("");
      const navigate = useNavigate();

      //form function
      const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`https://apni-dukaan-uccj.onrender.com/api/v1/auth/register`,{name,email,phone,address,question,password});
            if(res && res.data.success)
            {
                toast.success(res && res.data.message);
                navigate("/login");
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
    <Layout title="Register - Apni Dukaan">
      <div className="form-container mt-4 mb-4" style={{ minHeight: "70vh" }}>
        <form onSubmit={handleSubmit}>
        <h4 className="title">Register Form</h4>
          <div className="mb-1">
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-1">
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
          <div className="mb-1">
            <input
              type="text"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Phone No."
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              value={question}
              onChange={(e)=>setQuestion(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Your Favourite Book"
              required
            />
          </div>
          <div className="mb-1">
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
          <button type="submit" className="btn btn-primary" style={{justifySelf:"center"}}>
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
