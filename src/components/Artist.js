import React, { useState, useEffect, useContext } from "react";

import APIHandler from "../config/api/APIHandler";
import PlaylistComponent from "../components/PlaylistComponent";
import UserContext from "../config/auth/UserContext";
import BeatContext from "../config/context/BeatContext";
import PlaylistContext from "../config/context/PlaylistContext";
import PlayingContext from "../config/context/PlayingContext";
import PauseContext from "../config/context/PlayingContext";

const Artist = (props) => {
    const [currentBeat, setCurrentBeat] = useContext(BeatContext);
    const [currentPlaylist, setCurrentPlaylist] = useContext(PlaylistContext);
    const [isPlaying, setIsPlaying] = useContext(PlayingContext);
    const [isPaused, setIsPaused] = useContext(PauseContext);
    const [isLoading, setIsLoading] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [favourite, setFavourite] = useState([]);
    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // return true if playlist and favourites contain data
    const pl = playlist.length > 0 ? true : false;
    const fr = favourite ? true : false;

    // fetch favourites from db that match with user id
    const fetchFavourites = async () => {
        try {
            await APIHandler.get("/favourite")
                .then(
                    async (res) =>
                        res.status === 200 && await setFavourite(res.data)
                )
                .then(setIsLoading(false));
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCart = async () => {
        try {
            await APIHandler.get("/cart")
                .then(
                    async (res) =>
                        res.status === 200 && await setCart(res.data)
                )
                .then(setIsLoading(false));
        } catch (err) {
            console.log(err);
        }
    };

    // fires after the component is first rendered
    useEffect(() => {
        setIsLoading(true);
        const fetchData = APIHandler.get(`/playlist/artist/${props.match.params.id}`)
            .then( res => setPlaylist(res.data))
            .then(fetchFavourites())
            .then(fetchCart())
            .then(setRefresh(false))
            .catch( err => console.log(err));
    }, [refresh]);

    // set clicked beat as current beat 
    // and use it in different components
    const handleOnClickSetCurrentBeat = (data) => {
        setCurrentBeat(data);
    };

    const handleOnClickSetCurrentPlaylist = () => {
        setCurrentPlaylist(playlist)
    }

    // function passed as prop 
    const handleOnClickIsPlaying = () => {
        setIsPlaying(true);
    };

    // function passed as prop
    const handleOnClickIsPaused = () => {
        setIsPaused(true);
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
            console.log("ok");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // if not loading and playlist and favourites array
        // have content then display Component
        <div className="playlist">
            {isLoading ? null : pl && fr ? (
                <PlaylistComponent  beatDetails = {playlist}
                                    currentBeat={currentBeat}
                                    isPlaying={isPlaying}
                                    favouritesList={favourite.favouriteList}
                                    cartList={cart.cartList}
                                    onClickIsPlaying={handleOnClickIsPlaying}
                                    onClickIsPaused={handleOnClickIsPaused}
                                    onClickSetCurrentPlaylist={handleOnClickSetCurrentPlaylist}
                                    onClickAddFavourite={handleOnClickAddFavourite}
                                    onClickDeleteFavourite={handleOnClickDeleteFavourite}
                                    onClickAddToCart={handleOnClickAddToCart}
                                    onClickDeleteFromCart={handleOnClickDeleteFromCart}
                                    onClickSetCurrentBeat={handleOnClickSetCurrentBeat}
                />
            ) : 
            <div>
                <p>No beat from this artist yet</p>
            </div>
            }
        </div>
    );
};

export default Artist;
