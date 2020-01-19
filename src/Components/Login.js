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
        <div className='landing'>
            <div className='logo'>
                <span>supple</span>
                <span className='logo-budget'>budget</span>
            </div>
            <p className='landing-intro'>Welcome back!</p>
            <div className='auth-form'>
                <input className='input'
                    value={email}
                    placeholder='Email'
                    maxLength='100'
                    onChange={(event) =>{updateEmail(event.target.value)}}/>
                <input className='input'
                    value={password}
                    type='password'
                    placeholder='Password'
                    maxLength='30'
                    onChange={(event)=>{updatePassword(event.target.value)}}/>
                <button className='button' onClick={login}>Login</button>
            </div>
            <Link to='/' id='register-login'>New to supplebudget? Sign up.</Link>
        </div>
    )
}

export default connect(null, {getUser})(Login);