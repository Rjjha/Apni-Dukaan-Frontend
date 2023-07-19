import React from "react";
import { useSearch } from "../../Context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://apni-dukaan-uccj.onrender.com/api/v1/product/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control btn-outline-success"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{borderRadius:"8px 0px 0px 8px", color:"white"}}
        />
        <button className="btn btn-outline-success" type="submit" style={{padding:"2px 8px", marginRight:"5px",borderRadius:"0px 4px 4px 0"}}>
         <BiSearch/>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;