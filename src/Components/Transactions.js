 import React from 'react';

const Transactions = (props) => {
    console.log(props)
    return (
        <div className='cat-main' >
            <div className='cat-info' >
                <div className='cat-gray'>
                    -
                </div>
                <div className='cat-name' id={
            props.transaction_type ==='income' ?
            'trans-income':'trans-outgo'}>
                    {props.transaction_name}
                </div>
                {props.transaction_type === 'income' ?
                    <div className='cat-balance'>+{props.transaction_amount}</div>
                    :
                    <div className='cat-balance'>-{props.transaction_amount}</div>}
            </div>
        </div>
    )
}

export default Transactions;