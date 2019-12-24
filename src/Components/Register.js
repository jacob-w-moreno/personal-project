import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const register = () => {
        axios
            .post('/api/register', {email, password})
            .then(() => {
                // this.props.history.push('/budget');
                console.log('yay');
            })
            .catch(() => console.log('a user with that email already exists'))
    }

    return (
        <div className='auth-secondary'>
            <Link to='/'><button 
                className='auth-cancel'>
                Cancel</button></Link>
            <p className='auth-secondary-text'>Register</p>
            <div className='auth-inputs'>
                <input
                    className='auth-input'
                    maxLength='100'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event) =>{
                        updateEmail(event.target.value)
                        console.log({email})
                    }}
                    />
                <input 
                className='auth-input'
                    type='password'
                    maxLength='30'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(event)=>{
                        updatePassword(event.target.value)
                        console.log({password})
                    }}
                    />
                </div>
            <button
                className='auth-button'
                onClick = {register}>
                Create Account</button>
        </div>
    )
}

export default Register;