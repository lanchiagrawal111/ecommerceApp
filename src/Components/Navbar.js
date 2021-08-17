import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Navbar.css";
import store from "../store";
import { fetchCartProducts } from "../actions/app.actions";

const Navbar = ({ cartProducts }) => {
  useEffect(() => {
    store.dispatch(fetchCartProducts());
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "row", backgroundColor: "gray" }}
    >
      <div style={{ width: "60%" }}>
        <ul id="navLeft">
          <li>
            <Link to="/">E-commerce</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
        </ul>
      </div>
      <div style={{ width: "40%" }}>
        <ul id="navRight">
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <span style={styles.cartCount}>{cartProducts.length}</span>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: "3px 3px",
    position: "absolute",
    right: 0,
    top: -2,
  },
};

function mapStateToProps({ appReducer }) {
  console.log("============================", appReducer.cartProducts);
  return {
    cartProducts: appReducer.cartProducts,
  };
}
export default connect(mapStateToProps)(Navbar);
