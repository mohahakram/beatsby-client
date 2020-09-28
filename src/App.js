import React, { useState, useMemo } from 'react';
// import './fontawesome.js'

import './App.scss';

import UpperNav from './components/UpperNav';
import Nav from './components/Nav';
import Main from './components/Main';
import MusicControls from './components/MusicControls';

import UserContext from "./config/auth/UserContext";
import AuthContext from './config/auth/AuthContext';
import BeatContext from './config/context/BeatContext';
import PlayingContext from './config/context/PlayingContext';
import PauseContext from './config/context/PauseContext';


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [isAuthorized, setIsAuthorized] = useState();
  const [currentBeat, setCurrentBeat] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState();


  return (
    <div className="outer-wrap">
      <div className="App">
        < UserContext.Provider value={ [currentUser, setCurrentUser] } >
        < AuthContext.Provider value={ [isAuthorized, setIsAuthorized] } >
        < BeatContext.Provider value={ [currentBeat, setCurrentBeat] } >
        < PlayingContext.Provider value={ [isPlaying, setIsPlaying] } >
        < PauseContext.Provider value={ [isPaused, setIsPaused] } >
            < UpperNav />    
            < Nav />    
            < Main />
            < MusicControls />
        </ PauseContext.Provider >
        </ PlayingContext.Provider >
        </ BeatContext.Provider >
        </ AuthContext.Provider >
        </ UserContext.Provider >
        
      </div>
    </div>
  );
}

export default App;
