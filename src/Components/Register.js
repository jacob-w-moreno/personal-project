import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const register = () => {
        axios
            .post('/api/register', {email, firstName, lastName, password})
            .then(() => {
                this.props.history.push('/budget');
            })
            .catch(() => console.log('a user with that email already exists'))
    }

    return (
        <div className='auth-secondary'>
            <Link to='/'><button 
                className='auth-cancel'>
                Cancel</button></Link>
            <p className='auth-secondary-text'>Create an account to start budgeting today.</p>
            <div className='auth-inputs'>
                <input
                    className='auth-input'
                    value={firstName}
                    placeholder='First Name'
                    onChange={(e) => {
                        setFirst(e.target.value)}}/>
                <input
                    className='auth-input'
                    placeholder='Last Name'
                    value={lastName}
                    onChange={(e) => {
                        setLast(e.target.value)}}/>
                <input
                    className='auth-input'
                    maxLength='100'
                    placeholder='Email'
                    value={email}
                    onChange={(event) =>{
                        updateEmail(event.target.value)}}/>
                <input 
                    className='auth-input'
                    type='password'
                    maxLength='30'
                    placeholder='Password'
                    value={password}
                    onChange={(event)=>{
                        updatePassword(event.target.value)
                    }}
                    />
                </div>
            <button
                className='auth-button'
                onClick = {register}>
                Create Account</button>
            <Link to='/login' id='register-login'>Already have an account? Login.</Link>
        </div>
    )
}

export default Register;