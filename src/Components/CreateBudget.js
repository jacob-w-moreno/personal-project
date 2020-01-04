import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import Category from './Category';
import axios from 'axios';

const CreateBudget = (props) => {
    const[showMore, toggleShowMore] = useState(false);

    useEffect(() => {
        getCategory()}, [])

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
        <div id='budget-main'>
            <div className='budget-totals'>
                <div className='budget-cat-total'>
                    <span>$</span>
                    <div className='line'/>
                    <span>$2,700</span>
                </div>
                {/* Add all category totals and put them below */}
                <div className='circle'>$3,100</div>
                <div className='budget-cat-total'>
                    <span>%</span>
                    <div className='line'/>
                    <span>$400</span>
                </div>
            </div>
            <div className='budget-header'>
                Categories
            </div>
            <div className='budget-white'>
                <span>Allocated</span>
                <span>Name</span>
                <span>Balance</span>
            </div>
            <div id='budget-list'>
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
            <div id='budget-buttons'>
                <button 
                    className='budget-button'
                    onClick={(()=> props.history.push('/create-transaction'))}>
                    Add Transaction</button>
                <button 
                    className='budget-button'
                    >
                    Add Income</button>
                <button onClick={(()=> props.history.push('/create-category'))}/>
            </div>
            
            {/* <button 
                    id='cb-add-new'
                    onClick={(()=> props.history.push('/create-category'))}>
                    Add Category
                </button> */}
            <Link to='budget'>Cancel</Link>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(CreateBudget);