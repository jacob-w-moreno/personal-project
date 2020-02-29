import React, {useState} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';

const Categories = (props) => {
    const [catInt, toggleCatInt] = useState(false);

    return(
        <div className='mini-main'>
            <h1 className = { props.category_type === "$" ?
                    props.category_balance === props.category_allocated ?
                        'mini-gray-full'
                        : 'mini-white'
                    : 'mini-gray'}
                onClick = {() => {props.setCatPennyFN(props.catPenny ? false : true)}}>
                {props.category_type === '%' ?
                    props.catPenny ? 
                        '%'+props.category_allocated 
                        : '%'+Math.trunc(props.category_allocated)
                    : props.catPenny ? 
                        '$'+props.category_allocated 
                        : '$'+Math.trunc(props.category_allocated)
                }
            </h1>
            <Link to={`category/${props.category_name}`}>
                <h1 className={props.category_type === "$"?'mini-name':'mini-name-dollar'}>{props.category_name}</h1>
            </Link>
            <h1 className = { props.category_type === "$" ?
                    props.category_balance === props.category_allocated ?
                        'mini-gray-full'
                        : 'mini-white'
                    : 'mini-gray'}
                onClick = {() => {props.setCatPennyFN(props.catPenny ? false : true)}}>
                {props.catPenny ?
                    '$'+(props.category_balance)
                    : '$'+Math.trunc(props.category_balance)}
            </h1>
        </div>
    )
}

export default withRouter(Categories);