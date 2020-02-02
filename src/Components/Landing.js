import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Landing = (props) => {

    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='landing'>
            <div className='logo'>
                <span>supple</span>
                <span className='logo-budget'>budget</span>
            </div>
            <p className='landing-intro'>Creating a budget that works for you has never been easier.</p>
            <form className='auth-form'>
                <div id='landing-names'>
                    <input className='input' id='landing-name'
                        value={firstName}
                        placeholder='First Name'
                        onChange={(e) => {setFirst(e.target.value)}}/>
                    <input className='input' id='landing-name'
                        value={lastName}
                        placeholder='Last Name'
                        onChange={(e) => {setLast(e.target.value)}}/>
                </div>
                <input className='input'
                    value={email}
                    placeholder='Email'
                    maxLength='100'
                    onChange={(event) =>{setEmail(event.target.value)}}/>
                <input className='input'
                    value={password}
                    placeholder='Password'
                    maxLength='30'
                    type='password'
                    onChange={(event)=>{setPassword(event.target.value)}}/>
                <button className='button'>Sign Up</button>
                </form>
            
            <Link to='/' className='landing-link'>
                    Already have an account? Log in.
                </Link>
        </div>
    )
}

export default Landing;