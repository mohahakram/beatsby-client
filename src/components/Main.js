import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from '../config/auth/ProtectedRoute'

import Beats from './Beats'
import Register from './Register'
import Login from './Login'
import UploadBeat from './UploadBeat'
import Playlist from './Playlist'
import Artist from './Artist'
import { useState, useEffect, useContext } from 'react'
import UserContext from '../config/auth/UserContext'

const Main = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext)
    console.log(currentUser);
    // useEffect(() => {
    // const setuser = setCurrentUser('ddddpppppppp')
    // console.log(currentUser)
        
    // }, [])
    
    return(
        <div className="main">
            <div className="upperNav">test test test</div>
            <div className="mainContent"></div>
                <Switch>
                    <Route path="/" exact>test</Route>        
                    <Route path="/beats" component={Beats}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <ProtectedRoute path="/upload" component={UploadBeat}/>
                    <Route path="/playlist/:id" component={Playlist}></Route>
                    <Route path="/artist/:id" component={Artist}></Route>
                </Switch>
        </div>
    )
}

export default Main