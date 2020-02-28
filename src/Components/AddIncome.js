// STATUS REPORT: Currently trying to make it so that when you add income, if the total of the percentage categories do NOT equal 100, it will create an "Overflow" category and add the rest of the income to that. It currently creates the Overflow category but does not insert any money into it; it all goes to the other categories. I've tried calling props.getCategory, making the axios request an async function, and making that logic its own separate function, calling it within DistributeDollar, and having it return distributePercentage.

import React, {useState} from 'react';
import CurrencyInput from 'react-currency-input';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import axios from 'axios';

const AddIncome = (props) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [type] = useState('income');
    // const [percent, setPercent] = useState([]);
// const [overflow, setOverflow] = useState([]);

    let submit = async (income) => {
        await distributeDollar(income);
        props.category.forEach(
            (el => {
                const added = (el.category_balance).toFixed(2);
                const id = (el.category_id)
                axios.put('/api/distribute', {added, id})
                    .catch(console.log('income add failed'))
            })
        )
        axios.post('/api/income', {name, amount, type})
            .then( props.history.push('/budget'))
            .catch('income not added to transactions')
    }

    let submitPercent = async (income) => {
        await distributePercent(income);
        props.category.forEach(
            (el => {
                const added = (el.category_balance).toFixed(2);
                const id = (el.category_id)
                axios.put('/api/distribute', {added, id, name, amount, type})
                .catch(console.log('income add failed'))
            })
        )
        props.history.push('/budget')
    }

    console.log('PROPS:', props.category);

    let distributeDollar = (income) => {
        if (props.category.length===0){console.log('NO CATEGORIES'); return}
        let dollars = props.category.filter(element => element.category_type === "$");
        for (let i=0; i<dollars.length; i++) {
            if (dollars[i].category_balance < dollars[i].category_allocated) {
                let difference = (+dollars[i].category_allocated - +dollars[i].category_balance).toFixed(2);
                if (+difference < +income) {
                    dollars[i].category_balance = +(+dollars[i].category_balance + +difference).toFixed(2);
                    income = (+income - +difference).toFixed(2);
                } else {
                    dollars[i].category_balance = +(+dollars[i].category_balance + +income).toFixed(2);
                    return;
                };
            };
        };
// RELATED TO OVERFLOW
        // const totals = props.category
        //     .filter(element => element.category_type === "%")
        //     .map(element => element.category_allocated)
        //     .reduce((acc, curr) => acc+curr, 0);
        // if (totals !== 100){
        //     const overflowTotal = (100 - totals);
        //     axios.post('/api/overflow', {overflowTotal})
        //     .then((res)=>{
        //     return})
        //     // return distributePercent(income)})
        //     .catch(console.log('FAIL: add overflow'))
        // }
        return distributePercent(income);
    };
    let distributePercent = income => {
// All of this information is already available on props.
        // axios
        //     .get('/api/category')
        //     .then(res=>setPercent(res.data))
        //     .catch(console.log('FAIL: get categories'));
        //     console.log('PERCENT:', percent);
        let percent = props.category.filter(element => element.category_type === '%');
            console.log('PERCENT:', percent);
        let oldTotals = percent.map((el) => +el.category_balance)
            .reduce((acc, curr) => acc + curr, 0);
            console.log('OLD TOTALS:', oldTotals);

        for (let i=0; i<percent.length; i++) {
            let portion = (income * (percent[i].category_allocated/100)).toFixed(2);
            percent[i].category_balance = +(percent[i].category_balance + +portion).toFixed(2);
        }
        let newTotals = percent.map((el) => +el.category_balance)
        .reduce((acc, curr) => acc + curr, 0);
        if (+newTotals.toFixed(2) !== +oldTotals + +income) {
        let difference = +(income - newTotals).toFixed(2);
        percent[0].category_balance = +(percent[0].category_balance + +difference);
        }
        return props.category;
    }

    return(
        <div className='form-main'>
            <span className='form-title'>Name</span>
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
                onClick={()=>submit(amount)}>
                Add</button>
            <button
                className='form-add-button'
                onClick={()=>submitPercent(amount)}>
                Add to Percentage</button>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(AddIncome);