import React from 'react';
import {connect} from 'react-redux';
import Transactions from './Transactions';

const History = (props) => {
    
    return(
        <div className='budget-main' id='history-main'>
            <div className='budget-header'>
                Transactions
            </div>
            <div className='budget-white'>
                <span>Date</span>
                <span>Name</span>
                <span>Amount</span>
            </div>
            <div id='budget-list'>
                {props.transactions
                    .map((element, index) => {
                        return(
                            <Transactions
                            key = {index}
                            transaction_name = {element.transaction_name}
                            transaction_amount = {element.transaction_amount}
                            transaction_type = {element.transaction_type}/>
                            )
                        })
                    }
            </div>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(History);