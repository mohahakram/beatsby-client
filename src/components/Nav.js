import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "../css/nav.scss";

// import './../fontawesome.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChevronLeft, faCompactDisc, faLevelUpAlt, faAddressBook, faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    const [showNav, setShowNav] = useState(false);
    // useLocation returns an object
    // and we can get the path fromm it
    let { pathname } = useLocation();

    // show or hide nav
    const handleOnClickShowNav = () => {
        setShowNav(!showNav);
    };

    return (
        <div className="nav">
            <div className="burger-menu" onClick={handleOnClickShowNav}>
                <FontAwesomeIcon icon={faBars} fixedWidth />
            </div>
            {/* change className on toggle to hide or show nav */}
            <div className={showNav ? "nav-bar-wraper" : "hidden-nav"}>
                <div className="nav-bar">
                    <div className="logo">
                        <Link to="/home">
                            <p>BeatsBy</p>
                            <div className="blink"></div>
                        </Link>
                    </div>
                    <div className="hide-nav" onClick={handleOnClickShowNav}>
                        <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
                    </div>
                    <ul>
                        <Link to="/" onClick={handleOnClickShowNav}>
                            {/* for each link check if path match then set active class  */}
                            <li
                                className={
                                    pathname === "/" || pathname === "/home"
                                        ? "active"
                                        : null
                                }
                            >
                                <div>
                                    <FontAwesomeIcon icon={faHome} fixedWidth />
                                    <span>Home</span>
                                </div>
                            </li>
                        </Link>
                        <Link to="/beats" onClick={handleOnClickShowNav}>
                            <li
                                className={
                                    pathname === "/beats" ? "active" : null
                                }
                            >
                                <div>
                                    <FontAwesomeIcon
                                        icon={faCompactDisc}
                                        fixedWidth
                                    />
                                    <span>Beats</span>
                                </div>
                            </li>
                        </Link>
                        <Link to="/upload" onClick={handleOnClickShowNav}>
                            <li
                                className={
                                    pathname === "/upload" ? "active" : null
                                }
                            >
                                <div>
                                    <FontAwesomeIcon
                                        icon={faLevelUpAlt}
                                        fixedWidth
                                    />
                                    <span>Upload</span>
                                </div>
                            </li>
                        </Link>
                        <Link to="/contact" onClick={handleOnClickShowNav}>
                            <li
                                className={
                                    pathname === "/contact" ? "active" : null
                                }
                            >
                                <div>
                                    <FontAwesomeIcon
                                        icon={faAddressBook}
                                        fixedWidth
                                    />
                                    <span>Contact</span>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Nav;
