import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useState } from 'react'
import APIHandler from '../config/api/APIHandler'
import { useContext } from 'react'
import UserContext from '../config/auth/UserContext'
import CountContext from '../config/auth/CountContext'
import CheckDate from '../config/auth/CheckDate'
// import CheckDate from '../config/auth/CheckDate'

//TODO redirect if user already logged in 

const Login = (props) => {
    const [ currentUser, setCurrentUser ] = useContext(UserContext);
    const CheckUser = async () => {
    await currentUser.hasOwnProperty('id') && props.history.push('/main');
        CheckUser();
    }
    
    const [ user, setUser ] = useState();
    
    const handleOnChange = async e => {
        setUser( { ...user, [e.target.name]: e.target.value } )
        // console.log(user)
    }
    
    // const check = await CheckDate();

    const handleOnSubmit = async e => {
        
        e.preventDefault()
        try {
            // console.log(user)
            await APIHandler.post('/session/login', user)
            .then( res => setCurrentUser(res.data));
            console.log('tout ok');
            props.history.push('/main')
        } catch (err) {
            console.log(err);
        }
    }
    console.log(currentUser);

    return(
        <div className="inputDiv">
            <h2>Login</h2>
            <form onChange={handleOnChange} onSubmit={handleOnSubmit} >
                <input type="text" name="email" placeholder="Email" required autoComplete="off"/>
                <input type="password" name="password" placeholder="Password" required autoComplete="off"/>
                <button >Login</button>
            </form>
        </div>
    )
}

export default Login;