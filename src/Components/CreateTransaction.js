import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import axios from 'axios';

const CreateTransaction = (props) => {
    const [category, setCategory] = useState('Choose a Category');
    const [showMore, toggleShowMore] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        getCategory()
        console.log(props)}, [])

    return(
        <div className='form-main'>
            <span className='form-title'>Category</span>
            <div id='ct-form-dropdown'>
                {showMore ? 
                    <div 
                        id='ct-dropdown'
                        onClick={()=> toggleShowMore(toggleShowMore ? false : true)}>
                        {props.category.map((element, index) => {
                            return (
                                <div key={index}
                                    id='ct-dropdown-category'
                                    onClick={()=> setCategory(element.category_name)}>
                                    {element.category_name}
                                </div>)})}
                    </div>
                :
                    <div id='ct-chosen-cat' onClick={()=> toggleShowMore(true)}>
                        {category}
                    </div>}
            </div>
            {/* <input className='form-input'/> */}
            <span 
                className='form-title'>
                Name</span>
            <input 
                className='form-input'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            <span 
                className='form-title'>
                Price</span>
            <input 
                className='form-input'
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                />
            <button className='form-add-button'
                onClick={()=>console.log(name, price)}>Add</button>
            <button
                className='form-add-button'
                onClick={()=>props.history.push('/create-budget')}>
                Cancel</button>
        </div>
    )
}

const mapStateToProps = (reduxState) =>{
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(CreateTransaction);