import {
  ADD_A_PRODUCT,
  DELETE_PRODUCT,
  DELETE_CART_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_CART_PRODUCTS,
  EDIT_PRODUCT_STARTED,
  EDIT_PRODUCT_SUCCESSFUL,
} from "../actions/actionTypes";
import { ADD_PRODUCT_IN_CART } from "../actions/actionTypes";

const initialState = {
  products: [],
  cartProducts: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_A_PRODUCT: {
      const newProducts = [...state.products, payload];
      return { ...state, products: newProducts };
    }
    case ADD_PRODUCT_IN_CART: {
      const newCartProducts = [...state.cartProducts, payload];
      return {
        ...state,
        cartProducts: newCartProducts,
      };
    }
    case FETCH_ALL_PRODUCTS: {
      return {
        ...state,
        products: payload,
      };
    }
    case FETCH_CART_PRODUCTS: {
      return {
        ...state,
        cartProducts: payload,
      };
    }
    case DELETE_PRODUCT: {
      // console.log("First", state.products, payload);
      const filteredArray = state.products.filter((product) => {
        return payload !== product.id;
      });
      // const filteredArrayCartProducts = state.cartProducts.filter((product) => {
      //   return payload !== product.id;
      // });
      console.log("delete prduc", state.products, filteredArray); // console.log(filteredArrayCartProducts);
      return {
        ...state,
        products: filteredArray,
      };
    }
    case DELETE_CART_PRODUCT: {
      // console.log("SEcond", state.cartProducts, payload);
      const filteredArray = state.cartProducts.filter((product) => {
        return payload !== product.id;
      });
      console.log("delete cart product", state.cartProducts, filteredArray);
      return {
        ...state,
        cartProducts: filteredArray,
      };
    }
    case EDIT_PRODUCT_STARTED: {
      let foundIndex = state.products.findIndex(
        (product) => payload.id === product.id
      );

      let temp = [...state.products];
      temp[foundIndex] = payload;
      console.log(state.products[foundIndex]);
      return {
        ...state,
        products: temp,
      };
    }
    case EDIT_PRODUCT_SUCCESSFUL: {
      const { name, description, price, rating } = payload;
      let foundIndex = state.products.findIndex(
        (product) => payload.id === product.id
      );
      let temp = [...state.products];

      temp[foundIndex] = payload;
      return {
        ...state,
        products: temp,
      };
    }

    default:
      return state;
  }
};
