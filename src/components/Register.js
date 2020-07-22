import React from 'react';
import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import APIHandler from '../config/api/APIHandler';


const Register = (props) => {
    
    const [user, setUser] = useState();
    
    const handleOnChange = async e => {
        setUser( { ...user, [e.target.name]: e.target.value } )
        console.log(user)
    }
    
    const handleOnSubmit = async e => {
        
        e.preventDefault()
        try {
            console.log(user)
            await APIHandler.post('/session/register', user);
            console.log('created');
            props.history.push('/login')
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div className="inputDiv">
            <h2>Register</h2>
            <form onChange={handleOnChange} onSubmit={handleOnSubmit} >
                <input type="text" name="firstName" placeholder="First name" required autoComplete="off"/>
                <input type="text" name="lastName" placeholder="Last name" required autoComplete="off"/>
                <input type="text" name="email" placeholder="Email" required autoComplete="off"/>
                <input type="password" name="password" placeholder="Password" require autoComplete="off"/>
                {/* <input type="password" name="confirmPassword" placeholder="Confirm password" require autoComplete="off"/> */}
                <button >Register</button>
            </form>
        </div>
    )
}

export default withRouter (Register);