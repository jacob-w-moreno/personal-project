import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import {withRouter} from 'react-router';
import CurrencyInput from 'react-currency-input';


const Categories = (props) => {

    const onInputChange = (float, mask, e) => {
        e.target.value = e.target.value.substring(1);
        props.updateDollar(props.index, +e.target.value)
    }

    return(
        <div className='mini-main'>
            <CurrencyInput 
                id='currency'
                value={props.category_allocated}
                onChange={onInputChange}
                prefix="$"
                precision={2}
                className='edit-allocated'/>
            <h1 className='mini-name'>{props.category_name}</h1>
            <h1 className='mini-gray'>
                ${(props.category_balance).toFixed(2)}
            </h1>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect (mapStateToProps, {getCategory})(withRouter(Categories));