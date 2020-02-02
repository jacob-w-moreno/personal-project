 import React from 'react';

const Transactions = (props) => {
    console.log(props)
    return (
        <div className='mini-main' >
            <div className='mini-gray'>
                -
            </div>
            <div className='mini-name' 
        //     id={
        // props.transaction_type ==='income' ?
        // 'trans-income':'trans-outgo'}
        >
                {props.transaction_name}
            </div>
            {props.transaction_type === 'income' ?
                <div className='mini-balance'>+{props.transaction_amount}</div>
                :
                <div className='mini-balance'>-{props.transaction_amount}</div>}
        </div>
    )
}

export default Transactions;