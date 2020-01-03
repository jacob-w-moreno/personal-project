import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser} from '../redux/reducer';
import axios from 'axios';

// Have this not be self-closing so you can render it within each component,  passing in new info every time. (look into render props!!)

const Header = (props) => {
    
    const getUser = () => {
        axios
            .get('/api/user')
            .then((res) => {
                props.getUser(res.data)
            })
            .catch(() => console.log('did not get user'))
    }
    
    useEffect(() => {
        getUser()}, [])

    return (
        <div id='header-main'>
            <Link to='/'><button
                className='auth-cancel'>
                Logout</button></Link>
            <h1
                id='header-username'>
                {props.user.users_username}</h1>
            <span id='header-plus'>+</span>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getUser})(Header);