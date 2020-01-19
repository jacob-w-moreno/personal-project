import React from 'react';
import {connect} from 'react-redux';
import Transactions from './Transactions';

const History = (props) => {
    
    return(
        <div className='main' id='history-main'>
            <div className='header'>
                Transactions
            </div>
            <div className='white-space'>
                <span className='column-left'>Date</span>
                <span className='column'>Name</span>
                <span className='column-right'>Amount</span>
            </div>
            <div className='list'>
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