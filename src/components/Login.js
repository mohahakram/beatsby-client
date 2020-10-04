import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "../css/input.scss";

import APIHandler from "../config/api/APIHandler";
import UserContext from "../config/auth/UserContext";
import AuthContext from "../config/auth/AuthContext";
import { SetWithExpiry } from "../config/auth/LocalStorageSetup";

//TODO redirect if user already logged in

const Login = (props) => {
    // const CheckUser = async () => {
    //     await currentUser.user && props.history.push('/main');
    //     CheckUser();
    // }

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [isAuthorized, setIsAuthorized] = useContext(AuthContext);

    const [serverResponse, setServerResponse] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useState();

    // listen to input change and add value to string
    const handleOnChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = async (e) => {
        // prevent page from refreshinf after submitting form
        e.preventDefault();
        try {
            await APIHandler.post("/session/login", user).then((res) => {
                setServerResponse(res.data);
                //authorization
                setIsAuthorized(true);
                // set user to Usercontext
                setCurrentUser({
                    id: res.data.id,
                    userName: res.data.userName,
                });
                // set user to local memory
                SetWithExpiry(
                    "user_auth",
                    { id: res.data.id, userName: res.data.userName, jwt: res.data.jwt },
                    300000000
                );
            });
            // if no error redirect user to home page
            props.history.push("/home");
            // else store error and later show it to user
        } catch (err) {
            setError(err.response.data.msg);
        }
    };

    return (
        <div className="input-main-content">
            <div className="input-div">
                <h2>Login</h2>
                <form onChange={handleOnChange} onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        required
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        autoComplete="off"
                    />
                    <button>Log in</button>
                </form>
                {/* if login error show error */}
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
                <div className="fallback">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
