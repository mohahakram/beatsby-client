import React, { useState, useMemo } from 'react';
import axios from 'axios';
// import './fontawesome.js'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import Nav from './components/Nav';
import Main from './components/Main';
import './App.scss';

import UserContext from "./config/auth/UserContext";
import CountContext from "./config/auth/CountContext";


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [currentCount, setCurrentCount] = useState(23);

  // const value = useMemo( () => ({ currentUser, setCurrentUser }), [ currentUser, setCurrentUser ]);

  return (
    <div className="outerWrap">
      <div className="App">
        < UserContext.Provider value={ [currentUser, setCurrentUser] } >
          < CountContext.Provider value={ [currentCount, setCurrentCount] } >
            < Nav />    
            < Main />
          </ CountContext.Provider >
        </ UserContext.Provider >
        
      </div>
      <div className="musicControls">music controls</div>
    </div>
  );
}

export default App;
