import React, { useState, useEffect, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserContext  from './UserContext'
import AuthContext  from './AuthContext'
import  { GetWithExpiry }  from '../auth/LocalStorageSetup'


export const ProtectedRoute = ({ component: Component, ...rest}) => {
    
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [isAuthorized, setIsAuthorized] = useContext(AuthContext);
    const [refresh , setRefresh] = useState(false)
    

    useEffect(() => {
                const item =  GetWithExpiry('user_auth')
                const checkItem = item ? (item.user ? ( setIsAuthorized(true), setCurrentUser(item.user),setRefresh(true) ) : null) : null
    }, [refresh])

    // if user in local storage and is athorized is true then render protected component 
    return isAuthorized && currentUser ? (
        < Route { ...rest } render={ props => < Component {...props} />} />
    ) : ( < Redirect to='/login' /> );
};