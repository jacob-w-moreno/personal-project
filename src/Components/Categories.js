import React, {useState} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';

const Categories = (props) => {
    const [catInt, toggleCatInt] = useState(false);

    return(
        <div className='mini-main'>
            <h1 className = 'mini-gray'
                onClick = {() => {props.setCatPennyFN(props.catPenny ? false : true)}}>
                {props.category_type === 'Percentage' ?
                    props.catPenny ? 
                        '%'+props.category_allocated 
                        : '%'+Math.trunc(props.category_allocated)
                    : props.catPenny ? 
                        '$'+props.category_allocated 
                        : '$'+Math.trunc(props.category_allocated)
                }
            </h1>
            <Link to={`category/${props.category_name}`}>
                <h1 className ='mini-name'>{props.category_name}</h1>
            </Link>
            <h1 className ='mini-balance'
                onClick = {() => {props.setCatPennyFN(props.catPenny ? false : true)}}>
                {props.catPenny ?
                    '$'+(props.category_balance)
                    : '$'+Math.trunc(props.category_balance)}
            </h1>
        </div>
    )
}

export default withRouter(Categories);