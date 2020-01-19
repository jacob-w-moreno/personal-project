import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getUser, logout} from '../redux/reducer';
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
        props.history.push('/');
        axios
            .post('/api/logout')
            .then(() => {
                props.logout();
            })
    }
    let arr = props.history.location.pathname.split('/')
    
    useEffect(() => {
        getUser()}, [])

    return (
        <div id='header'>
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
                            <div className='header-extra' id='right'>
                                {/* <Link to='create-category'> */}
                                    <button className='header-button' 
                                    onClick={()=>toggleAdd(false)}>
                                    Add Category</button>
                                    {/* </Link>  */}
                                {/* <Link to='add-income'> */}
                                    <button className='header-button' 
                                    onClick={()=>toggleAdd(false)}>
                                    Add Income</button>
                                    {/* </Link>     */}
                                {/* <Link to='create-transaction'> */}
                                    <button className='header-button'
                                    onClick={()=>toggleAdd(false)}>
                                    Add Expense</button>
                                    {/* </Link>  */}
                                <div id='white-space' onClick={()=>{toggleAdd(false); toggleExtra(false)}}/>
                            </div>
                            :null}
                    </div> : null}

                    {extra ?
                <div className='header-extra' id='left'>
                    <button className='header-button'
                        onClick={()=>{toggleExtra(false);props.history.push('/pie-chart')}}>
                        Pie Chart</button>
                    <button className='header-button'
                        onClick={()=>{toggleExtra(false);props.history.push('/history')}}>
                        Transaction History</button>
                    <button className='header-button'
                        onClick={()=>{logout(); props.logout();}}>
                        Log Out</button>
                    {/* <div id='white-space' onClick={()=>{toggleAdd(false); toggleExtra(false)}}/> */}
                </div>
                : null
            }

                {arr[arr.length-2] === 'category' ? 
                    <div className='header-main'>
                        <Link to='/budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>{arr[arr.length-1].toUpperCase()}</h1>
                        {/* <h1 className = 'header-heading'>CATEGORY</h1> */}
                        <div className='icon' id='add'/>
                    </div> : null}
                
                {props.history.location.pathname === '/pie-chart'?
                    <div className='header-main'>
                        <Link to='budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>PIE CHART</h1>
                        <div className='icon'/>
                    </div> : null}

                {props.history.location.pathname === '/history'?
                    <div className='header-main'>
                        <Link to='budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>HISTORY</h1>
                        <div className='icon'/>
                    </div> : null}

                {props.history.location.pathname === '/add-income'?
                    <div className='header-main'>
                        <Link to='budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>ADD INCOME</h1>
                        <div className='icon'/>
                    </div> : null}

                {props.history.location.pathname === '/create-category'?
                    <div className='header-main'>
                        <Link to='budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>NEW CATEGORY</h1>
                        <div className='icon'/>
                    </div> : null}

                {props.history.location.pathname === '/create-transaction'?
                    <div className='header-main'>
                        <Link to='budget'><div className='icon' id='back'/></Link>
                        <h1 className = 'header-heading'>ADD TRANSACTION</h1>
                        <div className='icon'/>
                    </div> : null}

            </div>
            
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getUser, logout})(withRouter(Header));