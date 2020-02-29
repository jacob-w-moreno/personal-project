import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import {getTransactions} from '../redux/reducer';
import Categories from './Categories';
import axios from 'axios';

const Budget = (props) => {
    const[showMore, toggleShowMore] = useState(false);
    const [catPenny, setCatPenny] = useState(false);
    const [edit, toggleEdit] = useState(true);
    // const [allocated, filterAllocated] = useState(true);
    // const [category, filterCategory] = useState(true);
    // const [balance, filterBalance] = useState(true);

    // let today = new Date();
    // let month = (today.getMonth()+1);
    // let day = (today.getDate());
    // console.log(today);
    // console.log(month);
    // console.log(day);

    useEffect(() => {
        getCategory();
        getTransactions()}, [])

    const getCategory = () => {
        axios
            .get('/api/category')
            .then((res) => {
                props.getCategory(res.data)
            })
            .catch(() => console.log('did not get categories'))
    }
    const getTransactions = () => {
        axios
            .get('/api/transaction')
            .then((res) => {
                props.getTransactions(res.data)
            })
    }

    const remove = id => {
        axios
            .delete(`/api/category/${id}`)
            .then(() => {
                getCategory()
            })
            .catch(() => console.log('cannot delete'))
    }

    let total = props.category && props.category.map(element =>
        element.category_balance
    )
    .reduce((acc, curr)=> acc+curr, 0);

    let dollarBalance = props.category && props.category.filter(element => element.category_type === "$")
    .map(element => element.category_balance)
    .reduce((acc, curr)=> acc+curr, 0);

    let percentageBalance = props.category && props.category.filter(element => element.category_type === "%")
    .map(element =>
        element.category_balance
    )
    .reduce((acc, curr)=> acc+curr, 0);

    let percentageTotal = props.category && props.category
        .filter(element => element.category_type === '%')
        .map(element =>
            element.category_allocated)
        .reduce((acc, curr) => acc + curr, 0);

    let dollarTotal = props.category && props.category
        .filter(element => element.category_type === '$')
        .map(element =>
            element.category_allocated)
        .reduce((acc, curr) => acc + curr, 0);

    return(
        <div className='main'>
            <div className='totals' onClick={()=>toggleShowMore(showMore ? false : true)}>
                <div className='total-cat'>
                    <span>${showMore ? dollarBalance.toFixed(2) : Math.trunc(dollarBalance)}</span>
                    <div className='line'/>
                    <span>${showMore ? dollarTotal.toFixed(2) : Math.trunc(dollarTotal)}</span>
                </div>
                <div className='circle'>${showMore ? total.toFixed(2) : Math.trunc(total)}</div>
                <div className='total-cat'>
                    <span>${showMore ? percentageBalance.toFixed(2) : Math.trunc(percentageBalance)}</span>
                    <div className='line'/>
                    <span>%{percentageTotal}</span>
                </div>
            </div>
            <div className='header'>Categories</div>
            <div className='white-space'>
                <span className='column-left' 
                    >Allocated</span>
                <span className='column'>Name</span>
                <span className='column-right'>Balance</span>
            </div>
            <div className='list'>
                {props.category
                    .filter(element => element.category_type === '$')
                    .map((element, index) =>{
                        return(
                            <Categories
                            key = {index}
                            category_id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}
                            removeFN = {remove}/>
                        )
                    })}
                {props.category
                    .filter(element => element.category_type === '%')
                    .map((element, index) =>{
                        return(
                            <Categories
                            key = {index}
                            category_id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}
                            removeFN = {remove}/>
                        )
                    })}
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory, getTransactions})(Budget);