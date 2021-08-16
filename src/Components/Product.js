import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import store from "../store";
import {
  addProductInCart,
  deleteProduct,
  editProductStarted,
  editProductSuccessful,
  fetchAllProducts,
  sortByPrice,
} from "../actions/app.actions";
import { lightBlue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  rootContainer: {
    margin: 10,
  },
  root: {
    width: "50%",
    boxShadow: 5,
    minWidth: 275,
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    margin: "auto",
  },
  actionIcons: {
    height: 25,
    width: 25,
    marginRight: 15,
    cursor: "pointer",
  },
});

const Product = ({ products }) => {
  console.log("AddEdproducts", products);
  const [values, handleValues, resetForm] = useForm({
    name: "",
    description: "",
    price: "",
    rating: "",
  });
  const [data, setData] = useState(null);

  const [sortProductsByPrice, setsortProductsByPrice] = useState(products);

  const classes = useStyles();
  useEffect(() => {
    store.dispatch(fetchAllProducts());
  }, []);

  const onAddItemToCart = (product) => {
    console.log("Adding product to cart----", product);
    try {
      store.dispatch(addProductInCart(product));
      toast.success("Added To Cart Successfully!");
    } catch (err) {
      toast.error("Added to Cart Failed" + err.message, { autoClose: false });
    }
  };

  const onDeleteProduct = (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this Product?")) {
        return;
      }
      store.dispatch(deleteProduct(id));
      toast.success("Product Deleted Successfully");
    } catch (err) {
      toast.error("Delete Failed" + err.message, { autoClose: false });
    }
  };

  const onSortByPrice = (products) => {
    // const obj = [...products];
    document.getElementById("sortButton").style.backgroundColor = "Gray";
    document.getElementById("crossButton").style.backgroundColor = "whitesmoke";
    products.sort((a, b) => {
      a = a.price.replace(/\,/g, "");
      b = b.price.replace(/\,/g, "");
      return parseFloat(a) - parseFloat(b);
    });
    setsortProductsByPrice(products);
    // store.dispatch(sortByPrice(products));
  };

  const removeSortByPrice = () => {
    document.getElementById("sortButton").style.backgroundColor = "whitesmoke";
    document.getElementById("crossButton").style.backgroundColor = "Gray";
    setsortProductsByPrice(products);
    store.dispatch(fetchAllProducts());
  };

  const onEditStart = (product) => {
    console.log(product);
    store.dispatch(editProductStarted(product));
    // console.log("EDITMODE>>>>>>>>>>>>>>>>>>>>>>", editMode);
    setData({
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      id: product.id,
    });
  };

  const onEditSuccessful = (newProduct) => {
    try {
      store.dispatch(editProductSuccessful(newProduct));
      toast.success("Product Updated Successfully");
    } catch (err) {
      toast.error("Update Failed" + err.message, { autoClose: false });
    }
  };

  const handleChange = (fieldName, e) => {
    const temp = { ...data };
    temp[fieldName] = e.target.value;
    setData(temp);
  };

  // function adjustHeight(el) {
  //   el.style.height =
  //     el.scrollHeight > el.clientHeight ? el.scrollHeight + "px" : "60px";
  // }
  return (
    <div>
      <h3>Product List</h3>

      <Button
        id="sortButton"
        style={{ marginLeft: 1000 }}
        onClick={() => onSortByPrice(products)}
      >
        Sort By Price
      </Button>
      <Button id="crossButton">
        <img
          style={{ marginRight: 0 }}
          className={classes.actionIcons}
          alt="cross"
          src="https://t4.ftcdn.net/jpg/02/38/87/83/240_F_238878356_MEtXA2GdF94LwiD4X9PmKQbe78Vvn1j0.jpg"
          onClick={() => removeSortByPrice()}
        />
      </Button>

      {products.map((product, key) => {
        console.log("product in map", product);
        return (
          <div className={classes.rootContainer} key={key}>
            <Card className={classes.root}>
              <CardContent>
                {product.edit ? (
                  <input
                    style={{ whiteSpace: "pre-line" }}
                    type="text"
                    onChange={(e) => handleChange("name", e)}
                    value={data.name}
                  />
                ) : (
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {product.name}
                  </Typography>
                )}
                <br />
                {/* <br />  */}
                {product.edit ? (
                  <textarea
                    style={{ whiteSpace: "pre-line" }}
                    rows={5}
                    cols={80}
                    onChange={(e) => handleChange("description", e)}
                    value={data.description}
                  />
                ) : (
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {product.description}
                  </Typography>
                )}
                <br />
                {/* <br />  */}
                {product.edit ? (
                  <input
                    style={{ whiteSpace: "pre-line" }}
                    type="text"
                    onChange={(e) => handleChange("price", e)}
                    value={data.price}
                  />
                ) : (
                  <Typography variant="body2" component="p">
                    {`Price - ${product.price}`}
                  </Typography>
                )}
                <br />
                {/* <br />  */}
                {product.edit ? (
                  <input
                    style={{ whiteSpace: "pre-line" }}
                    type="number"
                    onChange={(e) => handleChange("rating", e)}
                    value={data.rating}
                  />
                ) : (
                  <Typography variant="body2" component="p">
                    {`Rating - ${product.rating}`}
                  </Typography>
                )}

                <CardActions
                  className={classes.cardActions}
                  style={{ justifyContent: "space-between" }}
                >
                  <Button size="small" onClick={() => onAddItemToCart(product)}>
                    Add to cart
                  </Button>
                  <div className="cart-item-actions">
                    {product.edit ? (
                      <Button
                        size="small"
                        onClick={() => onEditSuccessful(data)}
                      >
                        Save
                      </Button>
                    ) : (
                      <img
                        className={classes.actionIcons}
                        alt="edit"
                        src="https://image.flaticon.com/icons/png/512/1828/1828911.png"
                        onClick={() => onEditStart(product)}
                      />
                    )}

                    <img
                      className={classes.actionIcons}
                      alt="delete"
                      src="https://image.flaticon.com/icons/png/512/3096/3096673.png"
                      onClick={() => onDeleteProduct(product.id)}
                    />
                  </div>
                </CardActions>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ appReducer }) => {
  console.log("mapstatetoprops products", appReducer.products);
  return {
    products: appReducer.products,
  };
};

export default connect(mapStateToProps)(Product);
