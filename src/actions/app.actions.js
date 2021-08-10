import { ADD_A_PRODUCT } from "./actionTypes";
import { ADD_PRODUCT_IN_CART } from "./actionTypes";

export const addProduct = (payload) => ({
    type: ADD_A_PRODUCT,
    payload,
});

export const addProductInCart = (payload) => ({
    type: ADD_PRODUCT_IN_CART,
    payload,
});