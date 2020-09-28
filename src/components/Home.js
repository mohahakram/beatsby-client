import React from "react";
import { Link } from "react-router-dom";

import "../css/home.scss";

const Home = () => {
    return (
        <div className="home-content">
            <img
                class="backrgound-image"
                src="https://images.unsplash.com/photo-1587916850012-13919928ef69?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1566&q=80"
                alt=""
            />
            <div className="home-text">
                <div className="text-center">
                    <h1>Thousands of high quality beats wating for you</h1>
                    <div className="search-link">
                        <h2>Looking for a beat for your project?</h2>
                        <p>
                            <Link to="/beats">
                                <span>Start</span>
                            </Link>{" "}
                            looking through music catalog
                        </p>
                    </div>
                    <div className="sell-link">
                        <h2>Want to sell your beat?</h2>
                        <p>
                            <Link to="/upload">
                                <span>Upload</span>
                            </Link>{" "}
                            your art and share with others
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
