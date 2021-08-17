import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";

import AddProduct from "./Components/AddProduct";
import Product from "./Components/Product";
import Cart from "./Components/Cart";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/ecommerceApp/">
            <Home />
          </Route>
          <Route path="/products">
            <Product />
          </Route>
          <Route path="/add-product">
            <AddProduct />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          {/* <Route path="/product-detail" >
            <Product />
          </Route> */}
          <ToastContainer autoClose={5000} />
        </div>
      </Router>
    </Provider>
  );
}

function Home() {
  return (
    <div>
      <img
        src="https://www.x-cart.com/wp-content/uploads/2017/05/2-768x256.png"
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default App;
