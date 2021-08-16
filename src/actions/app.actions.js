import {
  ADD_A_PRODUCT,
  FETCH_ALL_PRODUCTS,
  FETCH_CART_PRODUCTS,
  DELETE_PRODUCT,
  DELETE_CART_PRODUCT,
  EDIT_PRODUCT_STARTED,
  EDIT_PRODUCT_SUCCESSFUL,
} from "./actionTypes";
import { ADD_PRODUCT_IN_CART } from "./actionTypes";

// export const addProd = (payload) => ({
//   type: ADD_A_PRODUCT,
//   payload,
// });

export const addProductInCart = (payload) => {
  return (dispatch) => {
    const { name, description, price, rating, id } = payload;
    const url = "http://localhost:8000/cartProducts/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, description, price, rating, id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dATA", data);
        dispatch({
          type: ADD_PRODUCT_IN_CART,
          payload,
        });
      });
  };
};

export function addProduct(payload) {
  return (dispatch) => {
    const { name, description, price, rating } = payload;
    const url = "http://localhost:8000/products/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, description, price, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dATA", data);
        dispatch({
          type: ADD_A_PRODUCT,
          payload,
        });
      });
  };
}
export function editProductSuccessful(payload) {
  return (dispatch) => {
    const { name, description, price, rating } = payload;
    const url = "http://localhost:8000/products/" + payload.id;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormBody({ name, description, price, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data in edit------", data);
        dispatch({
          type: EDIT_PRODUCT_SUCCESSFUL,
          payload: data,
        });
      });
  };
}

export function fetchAllProducts() {
  return (dispatch) => {
    const url = "http://localhost:8000/products/";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        console.log(payload);
        dispatch({
          type: FETCH_ALL_PRODUCTS,
          payload,
        });
      });
  };
}

export function fetchCartProducts() {
  return (dispatch) => {
    const url = "http://localhost:8000/cartProducts/";
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((payload) => {
        console.log(payload);
        dispatch({
          type: FETCH_CART_PRODUCTS,
          payload,
        });
      });
  };
}

export function deleteProduct(id) {
  return (dispatch) => {
    const url = "http://localhost:8000/products/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dATA", data);
        dispatch(deleteFromCart(id));
        dispatch({
          type: DELETE_PRODUCT,
          payload: id,
        });
        //   Promise.resolve(dispatch(deleteFromCart(id))).then(() =>
        //     dispatch({
        //       type: DELETE_PRODUCT,
        //       payload: id,
        //     })
        //   );
      });
  };
}
export function editProductStarted(product) {
  console.log("FIRST");
  return {
    type: EDIT_PRODUCT_STARTED,
    payload: { ...product, edit: true },
  };
}

export function deleteFromCart(id) {
  return (dispatch) => {
    const url = "http://localhost:8000/cartProducts/" + id;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dATA", data);
        dispatch({
          type: DELETE_CART_PRODUCT,
          payload: id,
        });
      });
  };
}

export function getFormBody(params) {
  let formBody = [];
  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // if property name is user name convert it into 'user%20name' fill space with %20
    let encodedValue = encodeURIComponent(params[property]); // if username is lanchi agrawal convert it into lanchi%20agrawal
    formBody.push(encodedKey + "=" + encodedValue); //['username=lanchi','password=1234']
  }
  return formBody.join("&"); //'username=lanchi&password=1234'
}
