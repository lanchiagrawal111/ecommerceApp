import { ADD_A_PRODUCT } from "../actions/actionTypes";
import { ADD_PRODUCT_IN_CART } from "../actions/actionTypes";

const initialState = {
    products: [],
    cartProducts: [],
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case ADD_A_PRODUCT: {
            const newProducts = [...state.products, payload];
            return {...state, products: newProducts};
        }
        case ADD_PRODUCT_IN_CART: {
            const newCartProducts = [...state.cartProducts, payload];
            return {...state, cartProducts: newCartProducts};
        }
        default:
            return state;
    }
};