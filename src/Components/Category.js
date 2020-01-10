import React from 'react';
import {connect} from 'react-redux';
import Transactions from './Transactions';

const Category = (props) => {

    let current = props.category.filter(el => (
        el.category_name===props.match.params.category_name
    ))

    return(
        <div id='budget-main'>
            <div className='budget-totals'>
                <div className='budget-cat-total'>
                    <span>Allocated</span>
                    <div className='line'/>
                    ${current[0] && current[0].category_allocated}
                </div>
                <div className='circle'>{current[0] && current[0].category_name}</div>
                <div className='budget-cat-total'>
                    <span>Remaining</span>
                    <div className='line'/>
                    ${current[0] && current[0].category_balance}
                </div>
            </div>
            <div className='budget-header'>
                Transactions
            </div>
            <div className='budget-white'>
                <span>Date</span>
                <span>Name</span>
                <span>Price</span>
            </div>
            <div id='budget-list'>
                {props.transactions
                    .filter(element => element.category_id === current[0].category_id)
                    .map((element, index) => {
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