import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import {Howl, Howler} from 'howler';
// import APIHandler from '../config/api/APIHandler';
import BeatContext from '../config/context/BeatContext';
import PlaylistContext from '../config/context/PlaylistContext';
import PlayingContext from '../config/context/PlayingContext';
import PauseContext from '../config/context/PauseContext';

import MusicPlayer from './MusicPlayer';

import '../css/musicControls.scss';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faStepForward, faStepBackward} from "@fortawesome/free-solid-svg-icons";
import CurrentPlaylist from '../config/context/PlaylistContext';

const MusicControls =  (props) => {

    const [data, setData] = useState();
    const [currentBeat, setCurrentBeat] = useContext(BeatContext);
    const [currentPlaylist, setCurrentPlaylist] = useContext(PlaylistContext);
    const [isPlaying, setIsPlaying] = useContext(PlayingContext);
    const [isPaused, setIsPaused] = useContext(PauseContext);
    const [volume, setVolume] = useState(1);


    const handleOnClickIsPlaying = () => {
        const play = isPlaying ? (setIsPaused(true),setIsPlaying(true))
        :
        setIsPlaying(true)
    };

    const handleOnClickIsPaused = () => {
        setIsPaused(true);
        setIsPlaying(false);
    };
    
    const handleOnNext = () => {
        let beatIndex = currentPlaylist.indexOf(currentBeat);
        let nextIndex = beatIndex + 1 < currentPlaylist.length ?  currentPlaylist[beatIndex + 1] : currentPlaylist[0];
        setCurrentBeat(nextIndex);
    }

    const handleOnPrevious = () => {
        let beatIndex = currentPlaylist.indexOf(currentBeat);
        let previousIndex = beatIndex !== 0 ? currentPlaylist[beatIndex - 1] : currentPlaylist[0];
        setCurrentBeat(previousIndex);
    }

    const handleVolumeChange = (event) => {
        setVolume((parseInt(event.target.value) / 100 ))
        Howler.volume(volume)
    }

    return(
        <div className="music-controls">
            {currentBeat ? (
                <div className="beat-info">
                    <div className="beat-image">
                        <img src="https://images.unsplash.com/photo-1574169411236-be48f751eb90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60" alt=""/>
                    </div>
                    <div className="artist-info">
                        <p className="title">
                            { currentBeat? currentBeat.title : null}
                        </p>
                        <p>
                            <Link to={`/artist/${currentBeat.artist}`}>
                                {currentBeat.artist}
                            </Link>
                            { currentBeat.featureArtist ? 
                                (
                                <Link to={`/artist/${currentBeat.featureArtist}`}>
                                    {", " + currentBeat.featureArtist}
                                </Link>)
                            : null}
                        </p>
                    </div>
                </div>
            )
            : 
            (
                <div className="beat-info">
                    <div className="beat-image">
                        <img src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt=""/>
                    </div>
                </div>
            )}
            <div className="button-controls">
                <div className="previous-button" onClick={(e) => {
                    e.preventDefault()
                    handleOnPrevious()} }><FontAwesomeIcon icon={faStepBackward} fixedWidth />
                </div>
                { !isPlaying ?
                    currentBeat ? 
                        <div className="play-button" onClick={handleOnClickIsPlaying}>
                            <FontAwesomeIcon icon={faPlayCircle} fixedWidth />
                        </div>
                        :
                        <div className="play-button-disabled">
                            <FontAwesomeIcon icon={faPlayCircle} fixedWidth />
                        </div>
                    : 
                    
                    <div className="pause-button" onClick={handleOnClickIsPaused}>
                        <FontAwesomeIcon icon={faPauseCircle} fixedWidth />
                    </div>
                }
                <div className="next-button" onClick={(e) => {
                    e.preventDefault()
                    handleOnNext()} }><FontAwesomeIcon icon={faStepForward} fixedWidth />
                </div>
            </div>
            <div className="volume-control">
                <input type="range" min="0" max="100"  value={volume * 100} onChange={handleVolumeChange}/>
            </div>
            <div className="music-player">
                < MusicPlayer />
            </div>
        </div>
    )

}

export default MusicControls;