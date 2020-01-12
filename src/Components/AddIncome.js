import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import axios from 'axios';

const AddIncome = (props) => {

    const [name, setName] = useState('');
    const[amount, setAmount] = useState(0);
    const [type] = useState('income');

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

    let distributeDollar = (income) => {
        let dollars = props.category.filter(element => element.category_type === "Dollar");
        for (let i=0; i<dollars.length; i++) {
            if (dollars[i].category_balance < dollars[i].category_allocated) {
                let difference = (+dollars[i].category_allocated - +dollars[i].category_balance).toFixed(2);
        
                if (+difference < +income) {
                    dollars[i].category_balance = +(+dollars[i].category_balance + +difference).toFixed(2);
                    income = (+income - +difference).toFixed(2);
                    console.log(`IF IF ADDED ${dollars[i].category_balance} TO: ${dollars[i].category_name}`)
                } else {
                    dollars[i].category_balance = +(+dollars[i].category_balance + +income).toFixed(2);
                    console.log(`IF ELSE ADDED ${dollars[i].category_balance} TO: ${dollars[i].category_name}`);
                    return;
                };
            };
        };
        return distributePercent(income);
    };
      
    let distributePercent = income => {
        let percent = props.category.filter(element => element.category_type === 'Percentage');
        let oldTotals = percent.map((el) => +el.category_balance)
        .reduce((acc, curr) => acc + curr, 0);
        console.log(`old totals: ${oldTotals}`)
        console.log(`income: ${income}`);
        for (let i=0; i<percent.length; i++) {
            let portion = (income * (percent[i].category_allocated/100)).toFixed(2);
            console.log(portion);
            percent[i].category_balance = +(percent[i].category_balance + +portion).toFixed(2);
            console.log(`Added ${portion} to ${percent[i].category_name}`)
        }
        
        let newTotals = percent.map((el) => +el.category_balance)
        .reduce((acc, curr) => acc + curr, 0);
        console.log(`new totals: ${newTotals}`)
        
        if (newTotals !== oldTotals + income) {
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