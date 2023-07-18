import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";


const ProductDetails = () => {
  const [cart,setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProducts(data?.products?._id,data?.products?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar products
  const getSimilarProducts = async(pid,cid) =>{
    try {
      const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  }

  //initialization
  useEffect(() => {
    if(params?.slug)
    {
        getProduct();
    }
  }, [params?.slug]);
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
            <img className="card-img-top" src={product.photo} alt={product.name} height="280px" width="200px" />
        </div>
        <div className="col-md-6 ">
            <h1 className="text-center">Product details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Descrition : {product.description}</h6>
            <h6>Category : {product?.category?.name}</h6>
            <h6>Price : {product.price}</h6>
            <h6>Quantity : {product.quantity}</h6>
            <button className="btn btn-secondary ms-1" onClick={() =>{setCart([...cart,product]) ;localStorage.setItem('cart',JSON.stringify([...cart,product])) ;toast.success("Item Added to cart")}} >Add to Cart</button>
        </div>
      </div>
      <hr/>
      <div className="row continer">
      <h5 className="text-center">Related Products</h5>
      {relatedProduct.length < 1 && <p className="text-center">No Similar Product Found</p>}
            <div className="d-flex flex-wrap">
            {relatedProduct?.map( (p)=> (
                <div className="card m-2" style={{ width: "18rem" }} key={p._id} >
                <img src={p.photo}className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                   {p.description.substring(0,30)}
                  </p>
                  <p className="card-text">
                    ₹ {p.price}
                  </p>
                  <div className="flex-row">
                  <button className="btn btn-primary " onClick={() => navigate(`/product/${p.slug}`)} >More Details</button>
                  <button className="btn btn-secondary ms-1" onClick={() =>{setCart([...cart,p]) ;localStorage.setItem('cart',JSON.stringify([...cart,p])) ;toast.success("Item Added to cart")}} >Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
            </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
