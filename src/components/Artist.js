import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import APIHandler from '../config/api/APIHandler';

import PlaylistComponent from "../components/PlaylistComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

import UserContext from '../config/auth/UserContext';

const Artist = (props) => {
    const { user, setUser } = useContext(UserContext);
    const [artist, setArtist] = useState([]);
    const pl = artist.length > 0 ? true : false;

    console.log(artist);

    useEffect(() => {
        const fetchData = APIHandler.get(`/playlist/artist/${props.match.params.id}`)
            .then( res => setArtist(res.data))
            .catch( err => console.log (err))
        
    }, [])


    return(
        <div>
            {pl &&
                < PlaylistComponent passedData = { artist } />
            }
        </div>
    )
}

export default Artist;