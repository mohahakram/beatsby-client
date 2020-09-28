import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import APIHandler from "../config/api/APIHandler";

import "../css/input.scss";

const Register = (props) => {
    const [user, setUser] = useState();
    const [error, setError] = useState();

    //listen to change in input and append the value to user
    const handleOnChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(user);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user);
            await APIHandler.post("/session/register", user)
                .then((res) => {
                    props.history.push("/login");
                })
                .catch((err) => setError(err.response.data.msg));
        } catch (err) {
            setError(err.response.data.msg);
        }
    };

    return (
        <div className="input-main-content">
            <div className="input-div">
                <h2>
                    Join us to discover talented artists and share your art!
                </h2>
                <form onChange={handleOnChange} onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        name="userName"
                        placeholder="User name"
                        required
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
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
                    {/* <input type="password" name="confirmPassword" placeholder="Confirm password" require autoComplete="off"/> */}
                    <button>Register</button>
                </form>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="fallback">
                    <p>
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Register);
