import React, { useState } from "react";
import { TextField, Button, FormControl } from "@material-ui/core";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core";
import useForm from "../hooks/useForm";

import "./AddProduct.css";
import store from "../store";
import { addProduct } from "../actions/app.actions";

const useStyles = makeStyles({
  textInput: {
    width: 500,
    margin: 10,
  },
  centerButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  addButton: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  labelStyle: {
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
});

const AddProduct = () => {
  const [values, handleValues, resetForm] = useForm({
    name: "",
    description: "",
    price: "",
    rating: "",
    image: "",
  });
  const [validation, setValidation] = useState({
    name: false,
    description: false,
    price: false,
    rating: false,
    image: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!values.name) {
    //   setValidation({ ...validation, name: true });
    // }
    // if (!values.description) {
    //   setValidation({ ...validation, description: true });
    // }
    // if (!values.price) {
    //   setValidation({ ...validation, price: true });
    // }
    // if (!values.rating) {
    //   setValidation({ ...validation, rating: true });
    // }
    try {
      if (values.name && values.description && values.price && values.rating) {
        store.dispatch(addProduct(values));
        toast.success("Product Added Successfully");
        resetForm();
      }
    } catch (err) {
      toast.error("Adding Product Failed" + err.message, { autoClose: false });
    }
  };

  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          justifyContent: "flex-start",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div className="heading">
          <h2>Add a product</h2>
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.labelStyle}>
            <label>Name</label>
          </div>
          <TextField
            error={validation.name}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className={classes.textInput}
            name="name"
            value={values.name}
            onChange={handleValues}
          />
          <div className={classes.labelStyle}>
            <label>Description</label>
          </div>
          <TextField
            error={validation.description}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            className={classes.textInput}
            name="description"
            value={values.description}
            onChange={handleValues}
          />
          <div className={classes.labelStyle}>
            <label>Price</label>
          </div>
          <TextField
            error={validation.price}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            className={classes.textInput}
            name="price"
            value={values.price}
            onChange={handleValues}
          />
          <div className={classes.labelStyle}>
            <label>Rating</label>
          </div>
          <TextField
            error={validation.rating}
            id="outlined-basic"
            label="Rating"
            variant="outlined"
            className={classes.textInput}
            name="rating"
            value={values.rating}
            onChange={handleValues}
          />

          <div className={classes.centerButton}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.addButton}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
