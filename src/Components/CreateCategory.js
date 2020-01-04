import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const CreateCategory = (props) => {
    const[name, setName] = useState('');
    const[amount, setAmount] = useState(0);
    const[type, setType] = useState('Dollar');

    const submit = () => {
        axios
            .post('/api/category', {name, amount, type})
            .then((res) => {
                setName('');
                setAmount(0);
                props.history.push('/create-budget');
            })
            .catch(()=>console.log('did not get category'))
    }
    return(
        <div className='form-main'>
            <span className='form-title'> Type </span>
            <div id='form-type-buttons'>
            <button
                className='form-type-button'
                onClick={()=>setType('Dollar')}>
                $</button>
            <button 
                className='form-type-button'
                onClick={()=>setType('Percentage')}>
                %</button>
            </div>
            <span className='form-title'> Name </span>
            <input
                className='form-input'
                value={name}
                onChange={(e)=>setName(e.target.value)}/>
            <span className='form-title'> Amount </span>
            <input
                className='form-input'
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}/>
            <button
                className='form-add-button'
                onClick={()=>submit()}>
                Add</button>
            <button
                className='form-add-button'
                onClick={()=>props.history.push('/create-budget')}>
                Cancel</button>
            <div id='cc-keyboard'/>
            {/* <button onClick={(()=>console.log(session.user))}>Click</button> */}
        </div>
    )
}

export default CreateCategory;