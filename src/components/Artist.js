import React, { useState, useEffect, useContext } from "react";

import APIHandler from "../config/api/APIHandler";
import PlaylistComponent from "../components/PlaylistComponent";
import UserContext from "../config/auth/UserContext";

const Artist = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [favourite, setFavourite] = useState([]);

    // return true if playlist and favourites contain data
    const pl = playlist.length > 0 ? true : false;
    const fr = favourite ? true : false;

    // fetch favourites from db that match with user id
    const fetchFavourites = async () => {
        try {
            await APIHandler.get("/favourite")
                .then(async (res) => await setFavourite(res.data))
                .then(setIsLoading(false));
        } catch (err) {
            console.log(err);
        }
    };

    // fires after the component is first rendered
    useEffect(() => {
        setIsLoading(true);
        const fetchData = APIHandler.get(
            `/playlist/artist/${props.match.params.id}`
        )
            .then( res => setPlaylist(res.data))
            .then(fetchFavourites())
            .catch( err => console.log(err));
    }, []);

    // get id of item and set it to users favourite db
    const handleOnClickAddFavourite = async (id) => {
        try {
            await APIHandler.post(`/favourite/add/${id}`)
            .then( res => console.log(res)
            );
        } catch (err) {
            console.log(err);
        }
    };

    //get id of item and set it to users cart db
    const handleOnClickAddToCart = async (id) => {
        try {
            await APIHandler.post(`/cart/add/${id}`).then((res) => {
                console.log(res);
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // if not loading and playlist and favourites array
        // have content then display Component
        <div>
            {" "}
            {isLoading ? null : pl && fr ? (
                <PlaylistComponent
                    beatDetails={playlist}
                    favouritesList={favourite.favouriteList}
                    onClickAddFavourite={handleOnClickAddFavourite}
                    onClickAddToCart={handleOnClickAddToCart}
                />
            ) : null}
        </div>
    );
};

export default Artist;
