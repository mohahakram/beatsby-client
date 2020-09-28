import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "../css/cart.scss";

import APIHandler from "../config/api/APIHandler";
import CheckoutForm from "./CheckoutForm";
import PlaylistComponent from "./PlaylistComponent";

//! call `loadStripe` outside of a component’s render to avoid
//! recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
    const [cart, setCart] = useState();
    const [cartTotalItems, setCartTotalItems] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        // fetch from user cart and set to cart list and //
        // set the number of items and total price to variables
        const res = APIHandler.get("/cart").then((dbRes) => {
            setCart(dbRes.data.cartList);
            setCartTotalItems(dbRes.data.cartList.length);
            setCartTotalPrice(
                dbRes.data.cartList.reduce((accumulator, item) => {
                    return accumulator + item.price;
                }, 0)
            );
            setRefresh(false);
        });
    }, [refresh]);

    // delete specific items from cart with id
    const handleDeleteFromCart = (id) => {
        try {
            APIHandler.post(`/cart/delete/${id}`).then((res) => {
                res.status === 200 && setRefresh(true);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cart-container">
            <div className="cart-total">
                {/* check if cart conatains item 
                before showing card form */}
                {cartTotalItems > 0 ? (
                    <div className="cart-payment">
                        <h2>Your cart total is {cartTotalPrice}$</h2>
                        <p>Enter your card infromations to continue</p>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm cartTotal={cartTotalPrice} />
                        </Elements>
                    </div>
                ) : null }
            </div>
            <div className="cart-list">
                {/* show number of items if there is any 
                    else show link to search page */}
                {cartTotalItems === 0 ? (
                    <div>
                        <h2>Your cart is empty</h2>
                        <h3>
                            <Link to="/beats">Search beats</Link>
                        </h3>
                    </div>
                ) : cartTotalItems > 1 ? (
                    <h2>{cartTotalItems} items in cart</h2>
                ) : (
                    <h2>{cartTotalItems} item in cart</h2>
                )}
                {/* if cart has item show component */}
                {cartTotalItems > 0 && (
                    <div className="playlist">
                        <PlaylistComponent
                            beatDetails={cart}
                            onClickDeleteFromCart={handleDeleteFromCart}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
