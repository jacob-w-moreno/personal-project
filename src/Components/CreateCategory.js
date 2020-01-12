import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import axios from 'axios';

const CreateCategory = (props) => {
    const[name, setName] = useState('');
    const[amount, setAmount] = useState(0);
    const[type, setType] = useState('Dollar');

    useEffect(() => {
        getCategory()}, [])

    useEffect(() => {
        if (type === 'Percentage' && amount > (100 - percentTotal)){
            setAmount((100 - percentTotal))
        }
    })

    const submit = () => {
        axios
            .post('/api/category', {name, amount, type})
            .then((res) => {
                setName('');
                setAmount(0);
                props.history.push('/budget');
            })
            .catch(()=>console.log('did not get category'))
    }

    let percentTotal = props.category
        .filter(element => element.category_type === 'Percentage')
        .map(element => element.category_allocated)
        .reduce((acc, curr)=> acc+curr, 0);

    return(
        <div className='form-main'>
            <span className='form-title'> Type </span>
            <div id='form-type-buttons'>
                <button className='form-type-button'
                    id={type === 'Dollar'?'clicked-button':null}
                    onClick={()=>{setType('Dollar'); setAmount(0)}}>
                    $</button>  
                <button className='form-type-button'
                    id={type === 'Percentage'?'clicked-button':null}
                    onClick={()=>{setType('Percentage'); setAmount(0)}}>
                    %</button>
            </div>
            {type === 'Percentage' ?
                <p id='form-percent'><span id='percent'>{100 - percentTotal}%</span> remaining.</p>
                : null}
            <span className='form-title'> Name </span>
            <input
                className='form-input'
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
            <span className='form-title'> Amount </span>
            <CurrencyInput 
                value={amount} 
                onChange={(e, maskedVal, floatVal)=>setAmount(maskedVal)}
                prefix={type === 'Dollar'?"$":"%"}
                precision={type === 'Dollar'?2:0}
                className='form-input'/>
             
            <button
                className='form-add-button'
                onClick={()=>submit()}>
                Add</button>
            <button
                className='form-add-button'
                onClick={()=>props.history.push('/budget')}>
                Cancel</button>
            
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(CreateCategory);