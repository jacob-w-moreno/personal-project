import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import Category from './Category';
import CurrencyInput from 'react-currency-input';
import axios from 'axios';

const CreateBudget = (props) => {
    const[form, toggleForm] = useState(false);
    const[name, setName] = useState('');
    const[amount, setAmount] = useState(0);
    const[type, setType] = useState('Dollar');
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

    const submit = () => {
        axios
            .post('/api/category', {name, amount, type})
            .then((res) => {
                setName('');
                setAmount(0);
                props.getCategory(res.data)
                getCategory();
                toggleForm();
            })
            .catch(()=>console.log('did not get category'))
    }

    return(
        <div id='cb-main'>
            <p id='temp-total'>$4,050<br/>remaining</p>
            {/* {props.category
                .map((element, index) => {element.category_value, element.category_spent})
                .reduce((acc, curr) => acc + curr)} */}
            <button 
                id='temp-button'
                onClick={null}>+</button>
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
            {form ?
                    <div id='cb-inputs'>
                        <span> Category </span>
                        <input
                            className='auth-input'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}/>
                        <span> Amount </span>
                        <input
                            className='auth-input'
                            value={amount}
                            onChange={(e)=>setAmount(e.target.value)}/>
                        <span> Type </span>
                        <div id='cb-form-buttons'>
                        <button
                            className='cb-form-button'
                            onClick={()=>setType('Dollar')}>
                            Dollar</button>
                        <button 
                            className='cb-form-button'
                            onClick={()=>setType('Percentage')}>
                            Percentage</button>
                        </div>
                        <div id='cb-form-buttons'>
                            <button
                                className='cb-form-button'
                                onClick={()=>submit()}>
                                Add</button>
                            <button
                                className='cb-form-button'
                                onClick={()=>toggleForm(false)}>
                                Cancel</button>
                            
                        </div>
                        <div id='cb-keyboard'/>
                    </div>
            :
            <button
                id='cb-add-new'
                onClick={()=>toggleForm(true)}>
                + Add another category
            </button>}
            <Link to='budget'>Cancel</Link>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(CreateBudget);