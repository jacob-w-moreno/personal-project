import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Categories from './Categories';
import EditCategories from './EditCategories';
import axios from 'axios';

const Budget = (props) => {
    const [categories, setCategories] = useState([]);
    const[showMore, toggleShowMore] = useState(false);
    const [catPenny, setCatPenny] = useState(false);
    const [edit, toggleEdit] = useState(true);

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = () => {
        axios
            .get('/api/category')
            .then((res) => {
                setCategories(res.data)
            })
            .catch(() => console.log('did not get categories'))
    }

    let total = categories
        .map(element => element.category_balance)
        .reduce((acc, curr)=> acc+curr, 0);

    let dollarBalance = categories
        .filter(element => element.category_type === "$")
        .map(element => element.category_balance)
        .reduce((acc, curr)=> acc+curr, 0);

    let dollarTotal = props.category && props.category
        .filter(element => element.category_type === '$')
        .map(element => element.category_allocated)
        .reduce((acc, curr) => acc + curr, 0);

    let percentageBalance = categories
        .filter(element => element.category_type === "%")
        .map(element =>element.category_balance)
        .reduce((acc, curr)=> acc+curr, 0);

    let percentageTotal = categories
        .filter(element => element.category_type === '%')
        .map(element => element.category_allocated)
        .reduce((acc, curr) => acc + curr, 0);

    return( <div className='main'>
        {edit ? 
            <div className='totals'
                onClick={()=>toggleShowMore(showMore ? false : true)}>

                <div className='circle'>${showMore ? total.toFixed(2) : Math.trunc(total)}</div>
                <div className='total-cat'>
                    <span>${showMore ? dollarBalance.toFixed(2) : Math.trunc(dollarBalance)}</span>
                    <div className='line'/>
                    <span>${showMore ? dollarTotal.toFixed(2) : Math.trunc(dollarTotal)}</span>
                </div>
                
                <div className='total-cat'>
                    <span>${showMore ? percentageBalance.toFixed(2) : Math.trunc(percentageBalance)}</span>
                    <div className='line'/>
                    <span>%{percentageTotal}</span>
                </div>
            </div>
        :
            <div className='totals' onClick={()=>toggleShowMore(showMore ? false : true)}>
                <div className='total-cat'>
                    <span>${showMore ? dollarBalance.toFixed(2) : Math.trunc(dollarBalance)}</span>
                    <div className='line'/>
                    <span>${showMore ? dollarTotal.toFixed(2) : Math.trunc(dollarTotal)}</span>
                </div>
                <div className='circle'>${showMore ? total.toFixed(2) : Math.trunc(total)}</div>
                <div className='total-cat'>
                    <span>${showMore ? percentageBalance.toFixed(2) : Math.trunc(percentageBalance)}</span>
                    <div className='line'/>
                    <span>%{percentageTotal}</span>
                </div>
            </div>
        }

        <div className='header'>Categories</div>
        <div className='white-space'>
            <span className='column-left'>Allocated</span>
            <span className='column'>Name</span>
            <span className='column-right'>Balance</span>
        </div>

        {edit ?
            <div className='list'>
                {props.category
                    .filter(element => element.category_type === '$')
                    .map((element, index) =>{
                        return( <EditCategories
                            key = {index}
                            category_id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}
                            total = {total}/>
                        )
                    })
                }
                {props.category
                    .filter(element => element.category_type === '%')
                    .map((element, index) =>{
                        return( <EditCategories
                            key = {index}
                            category_id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}
                            total = {total}/>
                        )
                    })
                }
            </div>
            :
            <div className='list'>
                {props.category
                    .filter(element => element.category_type === '$')
                    .map((element, index) =>{
                        return( <Categories
                            key = {index}
                            category_id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}/>
                        )
                    })
                }
                {props.category
                    .filter(element => element.category_type === '%')
                    .map((element, index) =>{
                        return( <Categories
                            key = {index}
                            category_id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}/>
                        )
                    })
                }
            </div>
        }
        <button className = 'form-add-button' 
            onClick={()=>toggleEdit(edit? false: true)}>EDIT</button>
    </div>)
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Budget);