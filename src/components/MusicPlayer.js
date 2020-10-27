import React, { useContext, useEffect, useState } from "react";
import { Howl, Howler } from "howler";

import BeatContext from "../config/context/BeatContext";
import PlayingContext from "../config/context/PlayingContext";
import PausedContext from "../config/context/PlayingContext";

import PlaylistComponent from "../components/PlaylistComponent"
import MusicControls from "../components/MusicControls"


const MusicPlayer = (props) => {
    const [currentBeat, setCurrentBeat] = useContext(BeatContext);
    const [isPlaying, setIsPlaying] = useContext(PlayingContext);
    const [isPaused, setIsPaused] = useContext(PausedContext);

    // if running in prod use live domain otherwise localehost
    const domain = process.env.NODE_ENV === 'production' ? 'https://beatsby.herokuapp.com/play/' : 'http://localhost:4001/play/' ;

    // get stream from backend with filename
    const source = currentBeat && domain + currentBeat.audioFile.fileName;


    var sound = new Howl({
        //[source],
        src: [source],//currentBeat.audioFile.fileName,
            // "http://www.hochmuth.com/mp3/Tchaikovsky_Rococo_Var_orch.mp3",
        html5: true,
        autoplay: isPlaying,
        volume: props.volume,
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

        </div>
    );
};

export default MusicPlayer;
