import React,{useState,useEffect} from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
import "../Styles/HomePage.css";
import { useAuth } from "../Context/Auth";
import axios from "axios";
import base_url from "../utils/api";
const HomePage = () => {
  const navigate = useNavigate();
  const [product,setProduct] = useState();
  const [auth,setAuth] = useAuth();

  const featured = async() =>{
    try {
      const {data} = await axios.get(`${base_url}/api/v1/product/list-product/${1}`);
      if(data)
      {
        setProduct(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    featured();
  },[])
  return (
    <Layout>
      <section className="hero">
        <article className="article">
          <h1>
            Search Less <br /> Buy More
          </h1>
          <p>
            Apni-Dukaan is an e-commerce platform which sells wide variety of
            products essentials. It is a one-stop destination for all your
            needs.
          </p>
          <button
            className="btn text-center mt-4 button"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </article>
        <article className="photo">
          <img src="/images/template.jpg" alt="photo" />
        </article>
      </section>

      <section className="text-center featured">
        <h2>Featured Products</h2>
        <div className="under_score"></div>
        <article>
          <img src={product?.length ?  product[0]?.photo : "/images/template.jpg"} alt="photo" onClick={()=>navigate(`/product/${product[0].slug}`)} />
          <div className="feat_prd">
            {product?.length ?  <p className="p_tag1" onClick={()=>navigate(`/product/${product[0].slug}`)}>{product[0]?.name} </p> :<p className="p_tag1">Apni Dukaan</p> }
            {product?.length ?  <p className="p_tag2" onClick={()=>navigate(`/product/${product[0].slug}`)}>₹ {product[0]?.price} </p> :<p className="p_tag2">₹ 500</p> }
          </div>
        </article>
        <div className="text-center mb-5 mt-5">
          <button
            className="btn all_prod button"
            onClick={() => navigate("/products")}
          >
            All Products
          </button>
        </div>
      </section>

      <section className="section_3">
        <div>
          <article className="service">
            <h3 style={{}}>
              Your wish
              <br />
              Our command
            </h3>
            <p>
              Customer satisfaction is the top-most priorty for Apni Dukaan. It
              is the only the trust and support of our customers that we are now
              reaching greater heights.
            </p>
          </article>
          <div className="service_conatiner">
            <article className="comp">
              <span>
                <GiCompass />
              </span>
              <h4>Mission</h4>
              <p className="text-center">
                Our mission is to provide our customers the best in class
                products and services at a very reasonable price.
              </p>
            </article>
            <article className="comp">
              <span>
                <GiDiamondHard />
              </span>
              <h4>Vision</h4>
              <p className="text-center">
                Our vision is to take Apni Dukaan to greater heights, by
                providing our customers best in class service.
              </p>
            </article>
            <article className="comp">
              <span>
                <GiStabbedNote />
              </span>
              <h4>History</h4>
              <p className="text-center">
                Apni Dukaan was started in July 22 with an initial aim to
                provide the best in class services to our customers.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section_4 text-center">
         <h2>Thank You <span>{auth?.user?.name}</span> for Visiting Our Website</h2>
         <h4>In case of any query</h4>
         <div>
         <button className="button btn" onClick={() => navigate("/contact")}> Please Contact</button>
         </div>
      </section>
    </Layout>
  );
};

export default HomePage;
