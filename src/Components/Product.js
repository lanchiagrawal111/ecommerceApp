import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import store from '../store';
import { addProductInCart } from '../actions/app.actions';

const useStyles = makeStyles({
    rootContainer: {
        margin: 10,
    },
    root: {
      width: '50%',
      boxShadow: 5,
      minWidth: 275,
      margin: 'auto',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardActions: {
      margin: 'auto'
    }
  });

const Product = ({products}) => {

    const classes = useStyles();

    const onAddItemToCart = (product) => {
        console.log('Adding product to cart----', product);
        store.dispatch(addProductInCart(product));
    }

    return (
        <div>
            <h3>Product List</h3>
            {products.map((product, key) => {
            return (
                <div className={classes.rootContainer} key={key}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {product.description}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`Price - ${product.price}`}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`Rating - ${product.rating}`}
                            </Typography>
                            <CardActions className={classes.cardActions}>
                                <Button size="small" onClick={() => onAddItemToCart(product)}>Add to cart</Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = ({appReducer}) => {
   return {
       products: appReducer.products,
   }
};

export default connect(mapStateToProps)(Product);