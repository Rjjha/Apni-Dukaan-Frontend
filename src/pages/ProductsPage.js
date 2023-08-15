import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import { AiOutlineReload } from "react-icons/ai";
import "../Styles/ProductPage.css";
import Card from "../components/Card/Card.js";
import base_url from "../utils/api";

const Products = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, SetRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get toal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/product/count-product`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/api/v1/product/list-product/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting all category");
    }
  };

  //filter by category
  const handleFilter = async (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log(error);
      toast.error("Error in handling filter");
    }
  };

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${base_url}/api/v1/product/list-product/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Error in showing products");
    }
  };

  //get all filter products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${base_url}/api/v1/product/filter-product`,
        { checked, radio }
      );
      setTotal(data?.products?.length);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error in filtering products");
    }
  };
  //initializing loadMore
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //initializing products
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    }
  }, [checked, radio]);

  return (
    <Layout title={"ALL Products - Best offers "}>
      <div className="pathroute">
        <h2>
          <span className="p1">Home</span>
          <span>/</span>
          <span className="p2">Products</span>
        </h2>
      </div>
      <div className="prdct">
        <div className="prdct_cont">
          <section className="filter">
            <div className="filter_cont">
              <h5>Category</h5>
              <div className="d-flex flex-column">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                    style={{color: "#617d98"}}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <h5>Price</h5>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => SetRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.Array} style={{color: "#617d98"}}>{p.name} </Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <button
              className="btn button reset"
              onClick={() => window.location.reload()}
            >
              Clear Filters
            </button>
          </section>
          <section className="prdct_main">
          <div className="d-flex flex-wrap mt-4 justify-content-center">
            {products?.map( (p)=> (
                <Card P_Id = {p._id} photo = {p.photo} name = {p.name} price = {p.price} slug={p.slug}/>
            ))}
          </div>
          <div className="text-center">
          {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                style={{fontSize:"1.6rem", color:"green"}}
              >
                {loading ? (
                  ""
                ) : (
                  <>
                    {" "}
                    <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
