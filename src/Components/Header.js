import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import getUser from '../redux/reducer';
import axios from 'axios';

const Header = (props) => {
    console.log(props)
    // const getUser = () => {
    //     axios
    //         .get(`/api/user/${id}`)
    // }
    return (
        <div id='header-main'>
            <Link to='/'><button
                className='auth-cancel'>
                Logout</button></Link>
            <h1
                id='header-username'>
                {props.user.users_username}</h1>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getUser})(Header);