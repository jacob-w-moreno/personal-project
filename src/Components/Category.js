import React from 'react';
import {connect} from 'react-redux';
import Transactions from './Transactions';

const Category = (props) => {

    let current = props.category.filter(el => (
        el.category_name===props.match.params.category_name
    ))

    return(
        <div className='main'>
            <div className='totals'>
                <div className='total-cat'>
                    <span>Allocated</span>
                    <div className='line'/>
                    {current[0] && current[0].category_type === 'Dollar'?"$":"%"}
                    {current[0] && current[0].category_allocated}
                </div>
                <div className='circle'>{current[0] && (current[0].category_balance).toFixed(2)}</div>
                <div className='total-cat'>
                    <span>Remaining</span>
                    <div className='line'/>
                    ${current[0] && (current[0].category_balance).toFixed(2)}
                </div>
            </div>
            <div className='header'>
                Transactions
            </div>
            <div className='white-space'>
                <span className='column-left'>Date</span>
                <span className='column'>Name</span>
                <span className='column-right'>Price</span>
            </div>
            <div className='list'>
                {props.transactions
                    .filter(element => element.category_id === current[0].category_id)
                    .map((element, index) => {
                        console.log(element)
                        return(
                            <Transactions
                                key = {index}
                                transaction_name = {element.transaction_name}
                                transaction_amount = {element.transaction_amount}/>
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

export default connect(mapStateToProps)(Category);