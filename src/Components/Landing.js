import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Landing = (props) => {

    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    return (
        <div id='landing-main'>
            <header id='landing-header'>
                <div>
                    <span id='landing-supple'>supple</span>
                    <span id='landing-budget'>budget</span>
                </div>
                
            </header>
            <p id='landing-intro'>
                Creating a budget that works for you has never been easier.
            </p>
            {/* <div id='landing-pic'>insert pic here</div> */}

{/* <p id='landing-intro'>Create an account to start budgeting today.</p> */}
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
            <div id='landing-buttons'>
                <Link to='/register'>
                    <button 
                        className='auth-button'>
                        Sign Up
                        </button>
                </Link>

                
                
            </div>
            <Link to='/login' id='register-login'>
                    Already have an account? Log in.
                </Link>
        </div>
    )
}

export default Landing;