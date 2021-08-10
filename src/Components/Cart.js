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

const Cart = ({cartProducts}) => {

    const classes = useStyles();

    return (
        <div>
            <h3>Cart Items</h3>
            {cartProducts.map((product, key) => {
            return (
                <div className={classes.rootContainer} key={key}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                                {`Price - ${product.price}`}
                            </Typography>
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
       cartProducts: appReducer.cartProducts,
   }
};

export default connect(mapStateToProps)(Cart);