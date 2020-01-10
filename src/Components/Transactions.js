import React from 'react';

const Transactions = (props) => {
    return (
        <div id='cat-main'>
            <div id='cat-info'>
                <div className='cat-gray'>
                    —
                </div>
                <div id='cat-name'>
                    {props.transaction_name}
                </div>
                <div id='cat-balance'>
                    -{props.transaction_amount}
                </div>
            </div>
        </div>
    )
}

export default Transactions;