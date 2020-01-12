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
            .post ('/api/login', {email, password})
            .then((res) => {
                props.getUser(res.data);
                props.history.push('/budget');})
            .catch(() => console.log('rip'))
    }

    return (
        <div className='auth-secondary'>
            <header id='landing-header'>
                <div>
                    <span id='landing-supple'>supple</span>
                    <span id='landing-budget'>budget</span>
                </div>
            </header>
            <p className='auth-secondary-text'>Welcome back!</p>
            <div className='auth-inputs'>
                <input
                    className='auth-input'
                    maxLength='100'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event) =>{
                        updateEmail(event.target.value)
                    }}/>
                <input 
                    className='auth-input'
                    type='password'
                    maxLength='30'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(event)=>{
                        updatePassword(event.target.value)
                    }}/>
            </div>
            <button
                className='auth-button'
                onClick={login}>
                Login</button>
            <Link to='/' id='register-login'>New to supplebudget? Sign up.</Link>
        </div>
    )
}

export default connect(null, {getUser})(Login);