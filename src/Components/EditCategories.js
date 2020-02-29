import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import {withRouter} from 'react-router';
import CurrencyInput from 'react-currency-input';


const Categories = (props) => {
    const [allocated, setAllocated] = useState(0);

useEffect(()=>{
    setAllocated(props.category_allocated)
    console.log(`${props.category_allocated} allocated to ${props.category_name}`)
}, [])

console.log('props:', props);

    return(
        <div className='mini-main'>
            <CurrencyInput 
                value={allocated} 
                onChange={(e, maskedVal, floatVal)=>setAllocated(maskedVal)}
                prefix={props.category_type === '$'?"$":"%"}
                precision={props.category_type === '$'?2:0}
                className='edit-allocated'/>

            <h1 className={props.category_type === "$"?'mini-name':'mini-name-dollar'}>{props.category_name}</h1>
            <h1 className='mini-gray'>
                ${(allocated * 0.01 * props.total).toFixed(2)}
            </h1>
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect (mapStateToProps, {getCategory})(withRouter(Categories));