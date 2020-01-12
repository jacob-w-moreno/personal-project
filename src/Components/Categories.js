import React, {useState} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';

const Categories = (props) => {
    const [catInt, toggleCatInt] = useState(false);

    return(
        <div 
            className='cat-main'
            // onClick={()=>props.history.push(`/category`)}
            >
            <div className='cat-info'>
                <h1 className = 'cat-gray'
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
                <h1 className ='cat-name'>{props.category_name}</h1></Link>
                <h1 className ='cat-balance'
                    onClick = {() => {props.setCatPennyFN(props.catPenny ? false : true)}}>
                    {props.catPenny ?
                        '$'+(props.category_balance)
                        : '$'+Math.trunc(props.category_balance)
                    }</h1>
            </div>
        </div>
    )
}

export default withRouter(Categories);