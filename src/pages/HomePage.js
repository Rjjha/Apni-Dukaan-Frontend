import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox , Radio} from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,SetRadio] = useState([]);
  const [total,setTotal] = useState(0); 
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);

  //get toal count
  const getTotal = async () =>{
    try{
      const {data} = await axios.get("/api/v1/product/count-product");
      setTotal(data?.total);
    } catch(error){
      console.log(error);
    } 
  }
//load more
const loadMore = async() =>{
  try{
    setLoading(true);
    const {data} = await axios.get(`/api/v1/product/list-product/${page}`);
    setLoading(false);
    setProducts([...products, ...data?.products]);
  }catch (error){
    setLoading(false);
    console.log(error);
  }
}

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all category");
    }
  };

  //filter by category
   const handleFilter = async (value ,id) =>{
        try {
          let all = [...checked];
          if(value)
          {
            all.push(id);
          }
          else
          {
            all = all.filter((c) => c !== id);
          }
          setChecked(all);
        } catch (error) {
          console.log(error);
          toast.error("Error in handling filter");
        }
   }

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/list-product/${page}`);
      setLoading(false);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Error in showing products");
    }
  };

  //get all filter products
  const filterProducts = async () =>{
    try {
      const {data} = await axios.post("/api/v1/product/filter-product",{checked,radio});
      setTotal(data?.products?.length)
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
      toast.error("Error in filtering products");
    }
  }
  //initializing loadMore
  useEffect(()=>{
    if(page === 1) return;
    loadMore();
  },[page]);

  //initializing products
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) 
    getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() =>{
    if(checked.length || radio.length)
    {
      filterProducts();
    }
  },[checked,radio])

  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-center">Filter By Category</h4>
            <hr/>
            <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked,c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
           </div>
           <h4 className="text-center mt-4">Filter By Price</h4>
           <hr/>
            <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => {SetRadio(e.target.value)}}>
              {Prices?.map( p =>(
                <div key={p._id}>
                  <Radio value={p.Array}>
                    {p.name}
                  </Radio>
                  </div>
              ))}
            </Radio.Group>
           </div> 
           <div className="d-flex mt-3">
              <button className = "btn btn-success" onClick={()=>window.location.reload()}>Reset Filters</button>
           </div>
          </div>
          <div className="col-md-9">
            <h3 className="text-center">All Products List </h3>
            <div className="d-flex flex-wrap">
            {products?.map( (p)=> (
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
            <div className = "m-2">
              {products && products.length < total && (
                <button className = "btn btn-warning" onClick ={(e) =>{e.preventDefault();setPage(page + 1)}}>
                  {loading? "loading..." : "loadmore"}
                </button>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
