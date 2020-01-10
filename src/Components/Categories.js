import React, {useState} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';

const Categories = (props) => {
    const [catInt, toggleCatInt] = useState(false);

    return(
        <div 
            id='cat-main'
            // onClick={()=>props.history.push(`/category`)}
            >
            <div id='cat-info'>
                {catInt ?
                    <h1 
                        className = 'cat-gray'
                        onClick = {() => {toggleCatInt(false)}}>${props.category_allocated}</h1>
                    : <h1 
                        className ='cat-gray'
                        onClick = {() => {toggleCatInt(true)}}>${Math.trunc(props.category_allocated)}</h1>
                }

                <Link to={`category/${props.category_name}`}>
                <h1 id ={
                    props.category_type === 'Percentage' ? 'cat-name-2':'cat-name'}>{props.category_name}</h1></Link>

                {catInt ?
                    <h1 
                        id ='cat-balance'
                        onClick = {() => {toggleCatInt(false)}}>${props.category_balance}</h1>
                    : <h1 
                        id ='cat-balance'
                        onClick = {() => {toggleCatInt(true)}}>${Math.trunc(props.category_balance)}</h1>
                }
            </div>
        </div>
    )
}

export default withRouter(Categories);