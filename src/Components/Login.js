import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../redux/reducer';
import axios from 'axios';

const Login = (props) => {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const login = () => {
        axios
            .post('/api/login', {email, password})
            .then((res) => {
                props.getUser(res.data)
                props.history.push('/budget');
            })
            .catch(() => console.log('rip'))
    }

    return (
        <div className='auth-secondary'>
            <Link to='/'><button 
                className='auth-cancel'>
                Cancel</button></Link>
            <p className='auth-secondary-text'>Login</p>
            <div className='auth-inputs'>
                <input
                    maxLength='100'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event) =>{
                        updateEmail(event.target.value)
                        console.log({email})
                    }}/>
                <input 
                    type='password'
                    maxLength='30'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(event)=>{
                        updatePassword(event.target.value)
                        console.log({password})
                    }}/>
            </div>
            <button
                className='auth-button'
                onClick={login}>
                Login</button>
        </div>
    )
}

export default connect(null, {getUser})(Login);