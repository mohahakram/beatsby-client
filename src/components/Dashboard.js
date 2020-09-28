import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import APIHandler from "../config/api/APIHandler";

import "../css/dashboard.scss";

import UserContext from "../config/auth/UserContext";
import AuthContext from "../config/auth/AuthContext";

import PlaylistComponent from "./PlaylistComponent";
import { removeItem } from "../config/auth/LocalStorageSetup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPowerOff, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [isAuthorized, setIsAuthorized] = useContext(AuthContext);

    const [data, setData] = useState();
    const [showBeats, setShowBeats] = useState(false);
    const [showFavourites, setShowFavourites] = useState(false);
    const [uploadedBeats, setUploadedBeats] = useState();
    const [favourites, setFavourites] = useState();
    const [cart, setCart] = useState(0);
    const [cartTotalItems, setCartTotalItems] = useState(0);

    useEffect(() => {
        const res = APIHandler.get("/dashboard").then((res) => {
            setData(res.data);
            setUploadedBeats(res.data.beats);
            setFavourites(res.data.favourites);
            //total items in cart
            setCartTotalItems(res.data.cart[0].cartList.length);
        });
    }, []);

    // toggle between showing and hiding uploaded beats
    const ShowUploadedBeats = () => {
        setShowBeats(!showBeats);
    };
    // toggle between showing and hiding favourite beats
    const ShowFavourites = () => {
        setShowFavourites(!showFavourites);
    };

    // destroys users session
    const handleLogOut = () => (
        removeItem("user_auth"), setCurrentUser(null), setIsAuthorized(false)
    );

    return (
        <div className="dashboard-main-container">
            <div className="user-container">
                <div className="user-cover">
                    <img
                        src="https://images.unsplash.com/photo-1574169411236-be48f751eb90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60"
                        alt=""
                    />
                </div>
                <div className="user-info">
                    {/* check for data before displaying */}
                    <h2>{data ? data.userName : null}</h2>
                    <p>{data ? data.email : null}</p>
                    {/* <p><Link>Change Password</Link></p> */}
                </div>
                <div className="logout" onClick={handleLogOut}>
                    <div>
                        <FontAwesomeIcon
                            icon={faPowerOff}
                            fixedWidth
                        ></FontAwesomeIcon>
                    </div>
                    <p>Log out</p>
                </div>
            </div>
            <div className="content-container">
                <h3>Cart</h3>
                {/* check if cart contains any item and how many 
                    then display apropriate message */}
                {cartTotalItems === 0 ? (
                    <div className="cart-total">
                        <p>Your cart is empty</p>
                    </div>
                ) : cartTotalItems > 1 ? (
                    <div className="cart-total">
                        <p>You have {cartTotalItems} items in your cart.</p>
                        <div className="cart-link">
                            <Link to="/cart">
                                <FontAwesomeIcon
                                    icon={faShoppingBag}
                                ></FontAwesomeIcon>
                                <p>Go to cart.</p>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="cart-total">
                        <p>You have 1 item in your cart</p>
                        <div className="cart-link">
                            <Link to="/cart">
                                <FontAwesomeIcon
                                    icon={faShoppingBag}
                                ></FontAwesomeIcon>
                                <p>Go to cart</p>
                            </Link>
                        </div>
                    </div>
                )}

                <h3>Uploaded Beats</h3>
                <div
                    className="show-uploaded-beats"
                    // toggle between showing or hiding content
                    onClick={ShowUploadedBeats}
                >
                    <p>Show list</p>
                    <span>
                        <FontAwesomeIcon icon={faChevronDown} fixedWidth />
                    </span>
                </div>
                <div>
                    {/* if show beats is set to true then show content */}
                    {showBeats ? (
                        <div className="playlist">
                            <PlaylistComponent
                                beatDetails={uploadedBeats}
                                favouritesList={favourites}
                            />
                        </div>
                    ) : null}
                </div>

                <h3>Favourites</h3>
                <div
                    className="show-favourites"
                    // toggle between showing or hiding content
                    onClick={ShowFavourites}
                >
                    <p>Show list</p>
                    <span>
                        <FontAwesomeIcon icon={faChevronDown} fixedWidth />
                    </span>
                </div>
                <div>
                    {/* if show favourites is set to true then show content */}
                    {showFavourites ? (
                        <div className="playlist">
                            <PlaylistComponent
                                beatDetails={uploadedBeats}
                                favouritesList={favourites}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
