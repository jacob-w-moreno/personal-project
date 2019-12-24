import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Landing = (props) => {
    return (
        <div id='landing-main'>
            <header id='landing-header'>
                <div>
                    <span id='landing-liquid'> liquid</span>
                    <span id='landing-budget'>budget</span>
                </div>
                <Link to='/login'>
                    <button 
                        id='landing-login'>
                        Log In
                    </button>
                </Link>
            </header>
{/* ===== ===== ===== ===== ===== ===== YOU ARE HERE ===== ===== ===== ===== ===== ===== */}
            <p id='landing-intro'>
                <span id='landing-liquid'>liquid</span> <span id='landing-budget'>budget</span> makes it easy to set and achieve financial goals—even if you have an inconsistent income.
            </p>
            <div id='landing-buttons'>
                <Link to='/register'>
                    <button 
                        className='auth-button'>
                        Sign Up! (It's free!)
                        </button>
                </Link>
                
            </div>
        </div>
    )
}

export default Landing;