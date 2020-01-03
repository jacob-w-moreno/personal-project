import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import Category from './Category';
import axios from 'axios';

const CreateBudget = (props) => {
    const[showMore, toggleShowMore] = useState(false);

    useEffect(() => {
        getCategory()
        console.log(props)}, [])

    const getCategory = () => {
        axios
            .get('/api/category')
            .then((res) => {
                props.getCategory(res.data)
                console.log(props.category)
            })
            .catch(() => console.log('did not get categories'))
    }

    const remove = id => {
        axios
            .delete(`/api/category/${id}`)
            .then(() => {
                getCategory()
            })
            .catch(() => console.log('cannot delete'))
    }

    return(
        <div id='cb-main'>
            <p id='temp-total'>$4,900<br/>remaining</p>
            {/* {props.category
                .map((element, index) => {element.category_value, element.category_spent})
                .reduce((acc, curr) => acc + curr)} */}
            <Link to='create-transaction'><button 
                id='temp-button'
                onClick={null}>+</button></Link>
                <div id='cb-menu'>
                    <span>Name</span>
                    <span>Allotted</span>
                    <span>Spent</span>
                    <span>Balance</span>
                </div>
            <div id='cb-list'>
                {props.category.map((element, index) => {
                    return(
                        <Category
                            key = {index}
                            category_id = {element.category_id}
                            category_name = {element.category_name}
                            category_value = {element.category_value}
                            category_type = {element.category_type}
                            category_spent = {element.category_spent}
                            removeFN = {remove}/>
                    )
                })}
            </div>
                <button 
                    id='cb-add-new'
                    onClick={(()=> props.history.push('/create-category'))}>
                    Add Category
                </button>
            <Link to='budget'>Cancel</Link>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(CreateBudget);