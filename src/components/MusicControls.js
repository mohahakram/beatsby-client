import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import {Howl, Howler} from 'howler';
import APIHandler from '../config/api/APIHandler';
import { useState } from 'react';
import { useEffect } from 'react';
import BeatContext from '../config/context/BeatContext';
import PlayingContext from '../config/context/PlayingContext';
import PauseContext from '../config/context/PauseContext';

import MusicPlayer from './MusicPlayer';

import '../css/musicControls.scss'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle, faStepForward, faStepBackward} from "@fortawesome/free-solid-svg-icons";

const MusicControls =  (props) => {

    const [data, setData] = useState();
    const [currentBeat, setCurrentBeat] = useContext(BeatContext);
    const [volume, setVolume] = useState(1);


    
    const handleOnPrevious = () => {
    }

    const handleOnNext = () => {
        
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
                { !props.isPlaying ?
                    <div className="play-button" onClick={props.onClickPlay}>
                        <FontAwesomeIcon icon={faPlayCircle} fixedWidth />
                    </div>
                    : 
                    
                    <div className="pause-button" onClick={props.onClickPause}>
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
        </div>
    )

}

export default MusicControls;