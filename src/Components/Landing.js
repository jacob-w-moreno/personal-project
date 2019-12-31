import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Landing = (props) => {
    return (
        <div id='landing-main'>
            <header id='landing-header'>
                <div>
                    <span id='landing-liquid'>liquid</span>
                    <span id='landing-budget'>budget</span>
                </div>
                <Link to='/login'>
                    <button 
                        id='landing-login'>
                        Log In
                    </button>
                </Link>
            </header>
            <p id='landing-intro'>
                Creating a budget that works for you has never been easier.
            </p>
{/* ===== ===== ===== ===== ===== ===== YOU ARE HERE ===== ===== ===== ===== ===== ===== */}
            <div
                id='landing-pic'>insert pic here</div>
            <div id='landing-buttons'>
                <Link to='/register'>
                    <button 
                        className='auth-button'>
                        Sign Up
                        </button>
                </Link>
                
            </div>
        </div>
    )
}

export default Landing;