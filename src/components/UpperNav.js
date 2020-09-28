import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../css/upperNav.scss";

import UserContext from "../config/auth/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faShoppingBag, faUser } from "@fortawesome/free-solid-svg-icons";

const UpperNav = () => {
    const [currentUser, setUserContext] = useContext(UserContext);

    return (
        <div className="upper-nav">
            <div className="page-navigation">
                <div>
                    <FontAwesomeIcon icon={faChevronLeft} fixedWidth />
                </div>
                <div>
                    <FontAwesomeIcon icon={faChevronRight} fixedWidth />
                </div>
            </div>
            <div>
                {/* if no user signed in show login and register links
                    else show cart and dashboard icons */}
                { !currentUser ? (
                    <ul className="user-navigation">
                        <Link to="/login">
                            <li>Log in</li>
                        </Link>
                        <Link className="nav-register" to="/register">
                            <li>Register</li>
                        </Link>
                    </ul>
                ) : (
                    <ul className="user-navigation">
                        <Link to="/cart">
                            <li>
                                <FontAwesomeIcon
                                    icon={faShoppingBag}
                                    fixedWidth
                                />
                            </li>
                        </Link>
                        <Link to="/dashboard">
                            <li>
                                <FontAwesomeIcon icon={faUser} fixedWidth />
                            </li>
                        </Link>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UpperNav;
