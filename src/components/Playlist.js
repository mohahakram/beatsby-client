import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIHandler from "../config/api/APIHandler";
import Beats from "./Beats";

import PlaylistComponent from "../components/PlaylistComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

const Playlist = (props) => {
    const [playlist, setPalylist] = useState([]);
    const pl = playlist.length > 0 ? true : false;

    useEffect(() => {
        console.log(props.match.params.id);
        const data = async () => {
            try {
                await APIHandler.get(`/playlist/${props.match.params.id}`).then(
                    async (res) => await setPalylist(res.data)
                );
                // console.log(done);
            } catch (err) {
                console.log(err);
            }
        };
        data();
    }, []);

    return (
        <div> { pl && 
            < PlaylistComponent passedData = {playlist} />}
         </div>
    )
};

export default Playlist;
