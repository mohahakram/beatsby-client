import React, { useContext, useEffect, useState } from "react";
import { Howl, Howler } from "howler";

import BeatContext from "../config/context/BeatContext";
import PlayingContext from "../config/context/PlayingContext";
import PausedContext from "../config/context/PlayingContext";

import PlaylistComponent from "../components/PlaylistComponent"
import MusicControls from "../components/MusicControls"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { faStepForward } from "@fortawesome/free-solid-svg-icons";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";

const MusicPlayer = (props) => {
    const [currentBeat, setCurrentBeat] = useContext(BeatContext);
    const [isPlaying, setIsPlaying] = useContext(PlayingContext);
    const [isPaused, setIsPaused] = useContext(PausedContext);

    // get stream from backend with filename
    const source = currentBeat && 'http://localhost:4001/play/' + currentBeat.audioFile.fileName;

    useEffect( () => {

    },[currentBeat])

    var sound = new Howl({
        //[source],
        src: [source],//currentBeat.audioFile.fileName,
            // "http://www.hochmuth.com/mp3/Tchaikovsky_Rococo_Var_orch.mp3",
        html5: true,
        autoplay: isPlaying,
        // onload: () => sound.play(),
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false),
    });

    isPaused && Howler.stop();

    isPlaying ? sound.play() : Howler.stop();

    const onClickHandleSetCurrentBeat = (data) => {
        setCurrentBeat(data)
        
    }
    
    const onClickHandlePlay = (data) => {
        if (isPlaying) {
            Howler.stop()
            sound.play()
        } else {

            setCurrentBeat(data)
            console.log("clicked on play");
            console.log("current beat: ", currentBeat);
            sound.play()
            // console.log(Howler)
        }
    }
    sound.once('play', () => {
        setIsPlaying(true)
    })
    sound.once('end', () => {
        setIsPlaying(false)
    })

    const onClickHandlePause = () => {
        Howler.stop();
        setIsPlaying(false)
    }

    return (
        <div>
            {/* { 
            props.beatDetails ? 
            < PlaylistComponent beatDetails = {props.beatDetails}
                                onClickPlay = {onClickHandlePlay}
                                onClickPause = {onClickHandlePause}
                                currentBeat = {currentBeat}
                                isPlaying = {isPlaying}
                                onClickSetCurrentBeat={onClickHandleSetCurrentBeat}
                                onClickAddFavourite={props.onClickAddFavourite} 
                                favouritesList={props.favouritesList}
                                onClickAddToCart={props.onClickAddToCart} />
            :
            null
            } */}

            {/* <div className="play-button" onClick={onClickHandlePlay}>
                <FontAwesomeIcon
                    icon={!isPlaying ? faPlayCircle : faPauseCircle}
                    fixedWidth
                />
            </div> */}
            {/* < MusicControls onClickPlay={onClickHandlePlay}
                            onClickPause={onClickHandlePause}
                            isPlaying={isPlaying}/> */}
        </div>
    );
};

export default MusicPlayer;
