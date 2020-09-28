import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../css/playlistComponent.scss";

import PlayingContext from "../config/context/PlayingContext";
import PauseContext from "../config/context/PauseContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faHeart,faCartArrowDown, faTimes, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const PlaylistComponent = (props) => {
    let { pathname } = useLocation();
    const [isPlaying, setIsPlaying] = useContext(PlayingContext);
    const [isPaused, setIsPaused] = useContext(PauseContext);
    const { artist, type } = props.beatDetails[0];
    const [source, setSource] = useState('')
    
    // ! replace from database
    const hhImage = "https://images.unsplash.com/photo-1589929168117-cd9ec5f27ab7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
    const trapImage = "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
    const afroImage = "https://images.unsplash.com/photo-1519635451045-a41d4361d495?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3023&q=80"
    const jazzyImage = "https://images.unsplash.com/photo-1552935088-b7474c4af004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3023&q=80"
    const rnbImage = "https://images.unsplash.com/photo-1452724931113-5ab6340ce080?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
    const soulImage = "https://images.unsplash.com/photo-1581297848080-c84ac0438210?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
    const electroImage = "https://images.unsplash.com/photo-1562369083-e501b585fd2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2863&q=80"
    const exclusiveImage = "https://images.unsplash.com/photo-1548691905-57c36cc8d935?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80"
    const leaseImage = "https://images.unsplash.com/photo-1596396289005-96863abfebbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
    
    useEffect(() => {
        const img = pathname === "/playlist/hip-hop" ? setSource(hhImage) 
        : pathname === "/playlist/trap" ? setSource(trapImage)
        : pathname === "/playlist/afro" ? setSource(afroImage)
        : pathname === "/playlist/jazzy" ? setSource(jazzyImage)
        : pathname === "/playlist/rnb" ? setSource(rnbImage)
        : pathname === "/playlist/soul" ? setSource(soulImage)
        : pathname === "/playlist/electro" ? setSource(electroImage)
        : pathname === "/playlist/exclusive" ? setSource(exclusiveImage)
        : pathname === "/playlist/lease" ? setSource(leaseImage)
        : null
        
    }, [])
    // ! replace from database

    return (
        <div>
            <div className="main-container-playlist">
                <div className="playlist-info">
                    <div className="cover-image">
                        <img
                            src= {source}
                            alt=""
                        />
                    </div>
                    {/* check pathname and display content accordingly */}
                    {pathname.includes("/playlist") ? (
                        <div className="playlist-details">
                            <p>Playlist</p>
                            <h2>{type}</h2>
                        </div>
                    ) : (
                        <div className="playlist-details">
                            <h2>{artist}</h2>
                        </div>
                    )}
                </div>

                <div>
                    <div className="playlist-container">
                        <div className="playlist-head">
                            <span className="play-button">
                                <FontAwesomeIcon icon={faPlay} fixedWidth />
                            </span>
                            <span className="favourite-button">
                                <FontAwesomeIcon icon={faHeart} fixedWidth />
                            </span>
                            <p className="title">TITLE</p>
                            <p className="artist">ARTIST</p>
                            <p className="bpm">BPM</p>
                            <p className="contract">CONTRACT</p>
                            <p className="price">PRICE</p>
                        </div>
                        <div className="playlist-infos">
                            {/* create row for each beat */}
                            {props.beatDetails.map((data) => (
                                <div //className="playlist-list"
                                    key={data._id}
                                    className={
                                        // change class if beat is clicked to set different
                                        // color to background
                                        props.currentBeat &&
                                        data._id === props.currentBeat._id ? 
                                            "current-track"
                                            : 
                                            "playlist-list"
                                    }
                                >
                                    {/* if beat is palying change play button to pause button */}
                                    {!props.isPlaying ? (
                                        <span
                                            className="play-button"
                                            onClick={() => {
                                                props.onClickSetCurrentBeat(data)
                                                const play = isPlaying ? (setIsPaused(true),setIsPlaying(true) ):
                                                setIsPlaying(true)
                                                // props.onClickPlay(data);
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faPlay}
                                                fixedWidth
                                            />
                                        </span>
                                    ) : ( props.currentBeat &&
                                        data._id === props.currentBeat._id ?
                                        <span
                                            className="pause-button"
                                            onClick={ () => 
                                                isPlaying ? setIsPlaying(false) : null
                                                    //   setIsPlaying(false)          
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faPause}
                                                fixedWidth
                                            />
                                        </span> 
                                        : 
                                        <span
                                        className="play-button"
                                        onClick={() => {
                                            props.onClickSetCurrentBeat(data);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            fixedWidth
                                        />
                                    </span>
                                    )}
                                    { 
                                    // check if beat id matches with one in favourites array
                                    // then set class with diffent to show if the beat has beat liked
                                    props.favouritesList ? 
                                        props.favouritesList.some(
                                            (id) => id === data._id
                                        ) ?
                                            <span className="is-favourite"
                                                onClick={(e) => {
                                                e.preventDefault();
                                                props.onClickDeleteFavourite(data._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                icon={faHeart}
                                                fixedWidth
                                                />
                                            </span>
                                        :
                                            <span className="favourite-button"
                                                onClick={(e) => {
                                                e.preventDefault();
                                                props.onClickAddFavourite(data._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                icon={faHeart}
                                                fixedWidth
                                                />
                                            </span>
                                        :
                                            <span className="favourite-button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    props.onClickAddFavourite(data._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                icon={faHeart}
                                                fixedWidth
                                                />
                                            </span>

                                    }
                                    <p className="title">{data.title}</p>
                                    {data.featureArtist ? (
                                        <p className="artist">
                                            <Link to={`/artist/${data.artist}`}>
                                                {data.artist + ", "}
                                            </Link>
                                            <Link
                                                to={`/artist/${data.featureArtist}`}
                                            >
                                                {data.featureArtist}{" "}
                                            </Link>
                                        </p>
                                    ) : (
                                        <p className="artist">
                                            <Link to={`/artist/${data.artist}`}>
                                                {data.artist}
                                            </Link>
                                        </p>
                                    )}
                                    <p className="bpm">{data.bpm}</p>
                                    <p className="contract">{data.contract}</p>
                                    <p className="price">{data.price}</p>
                                    {/* if user is in cart page show delete button instead of add to cart */}
                                    {pathname === "/cart" ? (
                                        <span
                                            className="delete-cart"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                props.onClickDeleteFromCart(
                                                    data._id
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                                fixedWidth
                                            />
                                        </span>
                                    ) : (
                                        props.cartList ? 
                                        // array method returns true if match
                                        props.cartList.some(
                                            (beat) => beat._id === data._id
                                        ) ? 
                                            <span 
                                                className="in-cart"
                                                onClick={(e) => {
                                                e.preventDefault();
                                                props.onClickDeleteFromCart(data._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                icon={faCartArrowDown}
                                                fixedWidth
                                                />
                                            </span>
                                                        :
                                            <span className="cart"
                                                onClick={(e) => {
                                                e.preventDefault();
                                                props.onClickAddToCart(data._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                icon={faCartArrowDown}
                                                fixedWidth
                                                />
                                            </span>
                                        :
                                            <span className="cart"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    props.onClickAddToCart(data._id);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                icon={faCartArrowDown}
                                                fixedWidth
                                                />
                                            </span>

                                    
                                    )}
                                    <span className="menu">
                                        <FontAwesomeIcon
                                            icon={faEllipsisV}
                                            fixedWidth
                                        />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistComponent;
