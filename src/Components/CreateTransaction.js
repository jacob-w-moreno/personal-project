import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import axios from 'axios';
import CurrencyInput from 'react-currency-input';

const CreateTransaction = (props) => {
    const [showMore, toggleShowMore] = useState(false);
    const [catId, setCategory_id] = useState(null);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('Choose a Category');
    const [type] = useState('outgo');
    const [categoryBalance, setCategoryBalance] = useState(0);
    const [newBalance, setNewBalance] = useState(categoryBalance);

    useEffect(() => {
        getCategory()}, [])

    useEffect(() => {
        setNewBalance((categoryBalance - amount).toFixed(2));
        if(amount > categoryBalance){
            setAmount(categoryBalance);
        }
    })
    const submit = () => {
        axios
            .post('/api/transaction', {catId,name,amount,category,type,newBalance})
            .then(() => {
                props.history.push('/budget');
            })
            .catch(()=>console.log('could not add transaction'))
    }

    return(
        <div className='form-main'>
            <span className='form-title'>Category</span>
            <div id='form-dropdown'>
                {showMore ? 
                    <div
                        onClick={()=> toggleShowMore(toggleShowMore ? false : true)}>
                        {props.category.map((element, index) => {
                            return (
                                <div 
                                    key={index}
                                    id='form-dropdown-item'
                                    onClick={()=> {
                                        setCategory(element.category_name);
                                        setCategory_id(element.category_id);
                                        setCategoryBalance(element.category_balance);
                                        setNewBalance(categoryBalance - amount);
                                    }}>
                                    {element.category_name}
                                </div>)})}
                    </div>
                :
                    <div 
                        id='form-chosen-category'
                        onClick={()=> toggleShowMore(true)}>
                        <span>{category}</span>
                        {category === 'Choose a Category' ?
                            null:<span>${categoryBalance}</span>}
                    </div>}
            </div>
            <span 
                className='form-title'>
                Name</span>
            <input 
                className='form-input'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            <span 
                className='form-title'>
                Amount</span>
                <CurrencyInput 
                value={amount} 
                onChange={(e, maskedVal, floatVal)=>{
                    setAmount(maskedVal);
                    setNewBalance((categoryBalance - amount).toFixed(2));
                }}
                prefix="$"
                className='form-input'/>
            <button className='form-add-button'
                onClick={()=>submit()}>
                Add</button>
            <button
                className='form-add-button'
                onClick={()=>props.history.push('/budget')}
                
                >
                Cancel</button>
        </div>
    )
}

const mapStateToProps = (reduxState) =>{
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(CreateTransaction);