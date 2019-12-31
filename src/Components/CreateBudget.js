import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import axios from 'axios';

const CreateBudget = (props) => {
    const[form, toggleForm] = useState(false);
    const[name, setName] = useState('');
    const[amount, setAmount] = useState(0);
    const[type, setType] = useState('Dollar');

    useEffect(() => {
        getCategory()}, [])

    const getCategory = () => {
        axios
            .get('/api/category')
            .then((res) => {
                props.getCategory(res.data)
            })
            .catch(() => console.log('did not get categories'))
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
            
            <h1
                id='cb-text'>Let's add a few categories.
            </h1>
            <div id='cb-categories'>
                {props.category.map((element, index)=>{
                    return(
                        <div
                            id='cb-doll-cat'
                            key={index}>
                            <h1>{element.category_name}</h1>
                            <h1>${element.category_value}</h1>
                        </div>
                    )
                })}
            </div>
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
                + Add another expense
            </button>}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(CreateBudget);