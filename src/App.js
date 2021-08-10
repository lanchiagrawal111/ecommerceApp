import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';

import AddProduct from './Components/AddProduct';
import Product from './Components/Product';
import Cart from './Components/Cart';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Navbar from './Components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/">
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
        </div>
      </Router>
    </Provider>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}


function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

export default App;
