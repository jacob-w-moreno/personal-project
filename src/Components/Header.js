import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser} from '../redux/reducer';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

// Have this not be self-closing so you can render it within each component,  passing in new info every time. (look into render props!!)

const Header = (props) => {
    const [extra, toggleExtra] = useState(false);
    const [add, toggleAdd] = useState(false);
    
    const getUser = () => {
        axios
            .get('/api/user')
            .then((res) => {
                props.getUser(res.data)
            })
            .catch(() => console.log('did not get user'))
    }

    const logout = () => {
        axios
            .post('/api/logout')
            .then(() => {
                props.history.push('/');
            })
    }
    let arr = props.history.location.pathname.split('/')
    
    useEffect(() => {
        getUser()}, [])

    return (
        <div>
            <div>
                {props.history.location.pathname === '/budget' ?
                    <div className='header-main'>
                        <div className='icon' id='hamburger'
                            onClick={()=>{
                                toggleExtra(extra ? false : true)
                                toggleAdd(false)}}/>
                        <h1 className = 'header-heading'>BUDGET</h1>
                        <div className='icon' id='add'
                            onClick={()=>{
                                toggleAdd(add ? false : true)
                                toggleExtra(false)}}/>

                        {add ?
                            <div id='header-extra'>
                                <Link to='create-transaction'>
                                <button className='hamburger-button'
                                    onClick={()=>toggleAdd(false)}>
                                    Add Expense</button></Link> 
                                <Link to='create-category'>
                                    <button className='hamburger-button'
                                        onClick={()=>toggleAdd(false)}>
                                        Add Category</button></Link> 
                                <button className='hamburger-button' id='hamburger-end'
                                    onClick={()=>toggleAdd(false)}>
                                    Add Income</button>
                            </div>
                            :null}
                    </div> : null}

                {arr[arr.length-2] === 'category' ? 
                    <div className='header-main'>
                        <Link to='/budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>{arr[arr.length-1].toUpperCase()}</h1>
                        {/* <h1 className = 'header-heading'>CATEGORY</h1> */}
                        <div className='icon' id='add'/>
                    </div> : null}
                
                {props.history.location.pathname === '/pie-chart' ?
                    <div className='header-main'>
                        <Link to='budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>PIE CHART</h1>
                        <div className='icon'/>
                    </div> : null}

            </div>

            {/* <div id='header-main'>
                <div className='icon' id='hamburger' onClick={()=>toggleExtra(extra ? false : true)}/>
                <h1 className='header-heading'>{arr[arr.length - 1]} </h1>
            </div> */}

            {extra ?
                <div id='header-extra'>
                    <Link to='pie-chart'><button className='hamburger-button'
                        onClick={()=>{toggleExtra(false)}}>
                        Pie Chart</button></Link>
                    <button className='hamburger-button'>
                        Transaction History</button>
                    <button className='hamburger-button' id='hamburger-end'
                        onClick={logout}>
                        Log Out</button>
                </div>
                : null
            }
            
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getUser})(withRouter(Header));