import React from 'react';
import {Link} from 'react-router-dom';

import "./Navbar.css";

const Navbar = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'row', backgroundColor: 'gray'}}>
            <div style={{width: '60%'}}>
                <ul id="navLeft">
                    <li><Link to="/">E-commerce</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/add-product">Add Product</Link></li>
                </ul>
            </div>
            <div style={{width: '40%'}}>
                <ul id="navRight">
                    <li><Link to="/cart">Cart</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;