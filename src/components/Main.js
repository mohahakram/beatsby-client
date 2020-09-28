import React from "react";
import { Switch, Route } from "react-router-dom";

import { ProtectedRoute } from "../config/auth/ProtectedRoute";

import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Beats from "./Beats";
import UploadBeat from "./UploadBeat";
import Playlist from "./Playlist";
import Artist from "./Artist";
import Dashboard from "./Dashboard";
import Cart from "./Cart";

const Main = () => {
    return (
        <div className="main">
            <div className="main-content">
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/beats" component={Beats}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/login" component={Login}></Route>
                    <ProtectedRoute path="/upload" component={UploadBeat} />
                    <Route path="/playlist/:id" component={Playlist}></Route>
                    <Route path="/artist/:id" component={Artist}></Route>
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <ProtectedRoute path="/cart" component={Cart} />
                </Switch>
            </div>
        </div>
    );
};

export default Main;
