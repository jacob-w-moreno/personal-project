import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const CreateTransaction = (props) => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    return(
        <div className='form-main'>
            <span className='form-title'>Category</span>
            <input className='form-input'/>
            <span className='form-title'>Name</span>
            <input className='form-input'/>
            <span className='form-title'>Price</span>
            <input className='form-input'/>
            <button className='form-add-button'>Add</button>
            <button
                className='form-add-button'
                onClick={()=>props.history.push('/create-budget')}>
                Cancel</button>
        </div>
    )
}

export default CreateTransaction;