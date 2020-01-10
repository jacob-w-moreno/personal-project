import React, {useState} from 'react';
import CurrencyInput from 'react-currency-input';
import {Link} from 'react-router-dom';
import axios from 'axios';

const CreateCategory = (props) => {
    const[name, setName] = useState('');
    const[amount, setAmount] = useState(0);
    const[type, setType] = useState('Dollar');
    const[currency, setCurrency] = useState(0);

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
    return(
        <div className='form-main'>
            <span className='form-title'> Type </span>
            <div id='form-type-buttons'>
            {type === 'Dollar' ?
                <button
                    className='form-type-button'
                    id='clicked-button'
                    onClick={()=>setType('Dollar')}>
                    $</button>
                : 
                <button
                    className='form-type-button'
                    onClick={()=>setType('Dollar')}>
                    $</button>
            }    

            {type === 'Dollar' ?
                <button 
                    className='form-type-button'
                    onClick={()=>setType('Percentage')}>
                    %</button>
                : 
                <button
                    className='form-type-button'
                    id='clicked-button'
                    onClick={()=>setType('Dollar')}>
                    %</button>
            }
            </div>
            <span className='form-title'> Name </span>
            <input
                className='form-input'
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
            <span className='form-title'> Amount </span>
            <CurrencyInput 
                value={amount} 
                onChange={(e, maskedVal, floatVal)=>setAmount(maskedVal)}
                prefix="$"
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

export default CreateCategory;