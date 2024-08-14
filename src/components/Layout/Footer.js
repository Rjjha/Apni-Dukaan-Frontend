import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";
const Footer = () => {
  return (
    <div className="footer">
      <div
        className="container"
        style={{
          height: "40px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Link>
            <AiFillGithub style={{fontSize:"40px",color:"#ab7a5f"}}/>
          </Link>
        </div>
        <div>
          <Link>
            <AiFillLinkedin style={{fontSize:"40px",color:"#ab7a5f"}} />
          </Link>
        </div>
        <div>
          <Link>
            <AiFillInstagram style={{fontSize:"40px",color:"#ab7a5f"}}/>
          </Link>
        </div>
        <div>
          <Link>
            <AiFillYoutube style={{fontSize:"40px",color:"#ab7a5f"}}/>
          </Link>
        </div>
      </div>
      <p className="text-center mt-4">
      <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/dashboard/user/orders">Orders</Link>
      </p>
      <div style={{height:"1.4px", width:"100%",backgroundColor:"#829ab0", marginTop:"28px"}}></div>
      <h5 className="text-center mt-3" style={{fontFamily:"'Poppins', sans-serif", fontWeight:100,color:"#829ab0" }} >
        &copy; {new Date().getFullYear()}
        <span style={{color:"#ab7a5f"}}> Apni Dukaan </span>
        - All Rights Reserved
      </h5>
    </div>
  );
};

export default Footer;
