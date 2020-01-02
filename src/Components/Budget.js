import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import PieChart from './PieChart';
import axios from 'axios';

const Budget = (props) => {
    
    let data = props.category.map(el => el.category_value)
    
    useEffect(() => {
        getCategory()
        console.log(props.category)}, [])
    const getCategory = () => {
        axios
            .get('/api/category')
            .then((res) => {
                props.getCategory(res.data)
            })
            .catch(() => console.log('did not get categories'))
    }

    return (
        <div>
            {/* {budget ?
            null : 
            <div
                id='budget-landing'>
                You don't have a budget yet. <br/>Let's make one!
                <Link to='/create-budget'>
                    <div
                        id='budget-default'>
                        <p id='budget-create'>Create New Budget</p>
                    </div>
                </Link>
            </div>} */}
                <PieChart
                    data = {data}></PieChart>
                <Link to='/create-budget'>
                    <p>make a budget</p>
                </Link>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(Budget);