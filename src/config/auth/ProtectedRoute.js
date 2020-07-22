import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext  from './UserContext';

const ProtectedRoute = ({ component: Component, ...rest}) => {
    const {currentUser} = UserContext;

    return currentUser ? (
        < Route {...rest} render={ props => <Component {...props} />} />
    ) : (<Redirect to='/login' />);
};

export default ProtectedRoute;