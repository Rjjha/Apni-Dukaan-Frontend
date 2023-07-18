import React, { useState,useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react"; 
import  axios from "axios";
import  toast  from "react-hot-toast";
 
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken,setClientToken] = useState("");
  const [instance,setInstance] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  //total price
  const totalPrice = () =>{
    try {
      let total = 0;
      cart?.map( p => (
       total+=p.price
      ));
      return total.toLocaleString("en-INDIA",{
        style:"currency",
        currency:"INR"
      });
    } catch (error) {
      console.log(error);
    }
  }  

  //remove item
  const removeCartItem = async(pid) =>{
      try {
        let myCart = [...cart];
        let index = myCart.findIndex(item => item._id === pid);
        myCart.splice(index,1);
        setCart(myCart);
        localStorage.setItem('cart',JSON.stringify(myCart));
      } catch (error) {
        console.log(error)
      }
  }
 //get payment gateway token
const getToken = async() =>{
  try {
    const {data} = await axios.get("/api/v1/product/braintree/token");
    setClientToken(data?.clientToken);
  } catch (error) {
    console.log(error);
  }
}

//payment handling
const handlePayment = async() =>{
  try {
    setLoading(true);
    const {nonce} = await instance.requestPaymentMethod();
    const {data} = await axios.post("/api/v1/product/braintree/payment",{
      nonce,cart
    });
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/orders");
    toast.success("Payment Done Successfully");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
}

useEffect(() =>{
 getToken()
},[auth?.token])

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12"></div>
          <h1 className="text-center p-2 mb-1">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className="text-center">
            {cart?.length > 0
              ? `You Have ${cart?.length} in Your Cart ${
                  auth?.token ? "" : "Please login to checkout"
                }` : "Your Cart is Empty" }
          </h4>
        </div>
        <div className="row">
          <div className="col-md-8">
            { 
            cart?.map( (p) => (
              <div className="row mb-2 card flex-row p-2">
              <div className="col-md-4">
                <img src={p.photo} className="card-img-top img img-responsive" alt={p.name} width={"100px"}/>
              </div> 
              <div className="col-md-8">
                <p>{p.name}</p>
                <p>{p.description.substring(0,30)}</p>
                <p>Price : {p.price}</p>
                <button className="btn btn-danger" onClick={()=> removeCartItem(p._id)} >Remove</button>
              </div>
              </div>
            ))
            }
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | checkout | Payment</p>
            <hr/>
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
              </div>
              </>
            ) : (
              <div className="mb-3"> 
               {
                auth?.token ? (
                  <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                ) : (
                   <button className="btn btn-outline-warning" onClick={() => navigate("/login",{ state:"/cart",})} >Please Login to checkout</button>
                )
               }
              </div>
            )}
            <div className="mt-2" >
              {!clientToken || !cart?.length ? ("") : (
                <>
                <DropIn 
              options={{
                authorization : clientToken,
                paypal:{
                  flow:"vault",
                }
              }}
              onInstance={instance => setInstance(instance)}
              />
              <button className="btn btn-primary" onClick={handlePayment} disabled = {!loading || !auth?.user?.address} >
                {loading ? "...loading" : "Make Payment"}
              </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
 