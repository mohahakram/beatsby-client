import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import APIHandler from "../config/api/APIHandler";

import "../css/dashboard.scss";

import UserContext from "../config/auth/UserContext";
import AuthContext from "../config/auth/AuthContext";
import BeatContext from "../config/context/BeatContext";
import PlaylistContext from "../config/context/PlaylistContext";
import PlayingContext from "../config/context/PlayingContext";
import PauseContext from "../config/context/PlayingContext";

import PlaylistComponent from "./PlaylistComponent";
import { removeItem } from "../config/auth/LocalStorageSetup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPowerOff, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [isAuthorized, setIsAuthorized] = useContext(AuthContext);
    const [currentBeat, setCurrentBeat] = useContext(BeatContext);
    const [currentPlaylist, setCurrentPlaylist] = useContext(PlaylistContext);
    const [isPlaying, setIsPlaying] = useContext(PlayingContext);
    const [isPaused, setIsPaused] = useContext(PauseContext);

    const [data, setData] = useState();
    const [showBeats, setShowBeats] = useState(false);
    const [showFavourites, setShowFavourites] = useState(false);
    const [uploadedBeats, setUploadedBeats] = useState();
    const [favourites, setFavourites] = useState();
    const [cart, setCart] = useState(0);
    const [cartTotalItems, setCartTotalItems] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const res = APIHandler.get("/dashboard").then((res) => {
            setData(res.data);
            setUploadedBeats(res.data.beats);
            setFavourites(res.data.favourites[0].favouriteList);
            //total items in cart
            setRefresh(false);
            return res.data.cart[0]?.cartList ? setCartTotalItems(res.data.cart[0].cartList.length) : null;
        });
    }, [refresh]);

    // toggle between showing and hiding uploaded beats
    const ShowUploadedBeats = () => {
        setShowBeats(!showBeats);
    };
    // toggle between showing and hiding favourite beats
    const ShowFavourites = () => {
        setShowFavourites(!showFavourites);
    };

    const handleOnClickAddFavourite = async (id) => {
        try {
            await APIHandler.post(`/favourite/add/${id}`).then((res) => {
                // refresh changed part so the user 
                //can see it has been added 
                return res.status === 200 && setRefresh(true)
            });
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleOnClickDeleteFavourite = async (id) => {
        try {
            await APIHandler.post(`/favourite/delete/${id}`).then((res) => {
                // refresh changed part so the user 
                //can see it has been added 
                res.status === 200 && setRefresh(true);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleOnClickAddToCart = async (id) => {
        try {
            await APIHandler.post(`/cart/add/${id}`).then((res) => {
                return res.status === 200 && setRefresh(true)
            });
            console.log("ok");
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleOnClickDeleteFromCart = async (id) => {
        try {
            await APIHandler.post(`/cart/delete/${id}`).then((res) => {
                res.status === 200 && setRefresh(true);
                ;
            });
        } catch (err) {
            console.log(err);
        }
    };

    // destroys users session
    const handleLogOut = () => (
        removeItem("user_auth"), setCurrentUser(null), setIsAuthorized(false)
    );

    // set clicked beat as current beat 
    // and use it in different components
    const handleOnClickSetCurrentBeat = (data) => {
        setCurrentBeat(data);
    };

    const handleOnClickSetCurrentPlaylist = () => {
        setCurrentPlaylist(cart)
    }

    // function passed as prop 
    const handleOnClickIsPlaying = () => {
        setIsPlaying(true);
    };

    // function passed as prop
    const handleOnClickIsPaused = () => {
        setIsPaused(true);
    };

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
                        uploadedBeats?.length > 0 ? 
                            <div className="playlist">
                                <PlaylistComponent
                                    beatDetails={uploadedBeats}
                                    favouritesList={favourites}
                                    onClickAddFavourite={handleOnClickAddFavourite}
                                    onClickDeleteFavourite={handleOnClickDeleteFavourite}
                                    onClickAddToCart={handleOnClickAddToCart}
                                    onClickDeleteFromCart={handleOnClickDeleteFromCart}
                                    currentBeat={currentBeat}
                                    isPlaying={isPlaying}
                                    onClickIsPlaying={handleOnClickIsPlaying}
                                    onClickIsPaused={handleOnClickIsPaused}
                                    onClickSetCurrentPlaylist={handleOnClickSetCurrentPlaylist}
                                    onClickSetCurrentBeat={handleOnClickSetCurrentBeat}
                                />
                            </div> : 
                            <div className="playlist">
                                <p className="empty">No uploaded beat</p>
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
                        favourites?.length > 0 ?
                            <div className="playlist">
                                <PlaylistComponent
                                    beatDetails={favourites}
                                    favouritesList={favourites}
                                    currentBeat={currentBeat}
                                    isPlaying={isPlaying}
                                    onClickIsPlaying={handleOnClickIsPlaying}
                                    onClickIsPaused={handleOnClickIsPaused}
                                    onClickSetCurrentPlaylist={handleOnClickSetCurrentPlaylist}
                                    onClickSetCurrentBeat={handleOnClickSetCurrentBeat}
                                />
                            </div> :
                            <div className="playlist">
                                <p className="empty">No favourites</p>
                            </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
