import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Categories from './Categories';
import EditPercent from './EditPercent';
import EditDollar from './EditDollar';
import axios from 'axios';

const Budget = (props) => {
    const [percent, setPercent] = useState([]);
    const [dollar, setDollar] = useState([]);
    const [showMore, toggleShowMore] = useState(false);
    const [catPenny, setCatPenny] = useState(false);
    const [edit, toggleEdit] = useState(true);

    useEffect(()=>{
        getCategory()
    },[])

    const getCategory = () => {
        axios
            .get('/api/category')
            .then((res) => {
                setPercent(res.data.filter(element => element.category_type === "%"))
                setDollar(res.data.filter(element => element.category_type === "$"))
            })
            .catch(() => console.log('did not get categories'))
    }

    const addCategory = (e) => {
        if (e.target.name==="%"){
            const newPercent = [...percent]
            newPercent.push({
                category_name: 'New',
                category_type: e.target.name,
                category_allocated: 0,
                category_balance: 0
            })
            setPercent(newPercent);
        }
        if (e.target.name==="$"){
            const newDollar = [...dollar]
            newDollar.push({
                category_name: 'New',
                category_type: e.target.name,
                category_allocated: 0,
                category_balance: 0
            })
            setDollar(newDollar)
        }
        console.log(e.target.name)
    }

    console.log(dollar, percent)

    const changeName = (index, value) => {
        const newPercent = [...percent];
        const newDollar = [...dollar];
        newPercent[index]["category_name"] = value;
        setPercent(newPercent);
    }

    const updatePercent = (index, value) => {
        const newPercent = [...percent];
        newPercent[index]["category_allocated"] = value;
        newPercent[index]["category_balance"] = (newPercent[index]["category_allocated"] * .01 * remainder);
        setPercent(newPercent);
    }

    const updateDollar = (index, value) => {
        const newDollar = [...dollar];
        newDollar[index]["category_allocated"] = value;
        newDollar[index]["category_balance"] = value;
        setDollar(newDollar);

        let remainder = (total - dollar.reduce((acc, curr) => acc + curr.category_balance, 0)).toFixed(2);

        const newPercent = [...percent];
        newPercent.forEach((element) => element.category_balance = (element.category_allocated * .01 * remainder))
        setPercent(newPercent);
    }
    
    let total = 500;
    
    let remainder = (total - dollar.reduce((acc, curr) => acc + curr.category_balance, 0)).toFixed(2);
    
    let dollarBalance = dollar
        .reduce((acc, curr)=> acc + curr.category_balance, 0);

    let dollarAllocated = dollar
        .reduce((acc, curr) => acc + curr.category_allocated, 0);

    let percentageBalance = percent
        .reduce((acc, curr)=> acc + curr.category_balance, 0);

    let percentageAllocated = percent
        .reduce((acc, curr) => acc + curr.category_allocated, 0);

    return( <div className='main'>
        {edit ? 
            <div className='totals' onClick={()=>toggleShowMore(showMore ? false : true)}>
                <div className='circle'>${showMore ? total.toFixed(2) : Math.trunc(total)}</div>
                <div className='total-cat'>
                    <span>${showMore ? dollarBalance.toFixed(2) : Math.trunc(dollarBalance)}</span>
                    <div className='line'/>
                    <span>${showMore ? dollarAllocated.toFixed(2) : Math.trunc(dollarAllocated)}</span>
                </div>
                <div className='total-cat'>
                    <span>${showMore ? percentageBalance.toFixed(2) : Math.trunc(percentageBalance)}</span>
                    <div className='line'/>
                    <span>%{percentageAllocated}</span>
                </div>
            </div>
        :
            <div className='totals' onClick={()=>toggleShowMore(showMore ? false : true)}>
                <div className='total-cat'>
                    <span>${showMore ? dollarBalance.toFixed(2) : Math.trunc(dollarBalance)}</span>
                    <div className='line'/>
                    <span>${showMore ? dollarAllocated.toFixed(2) : Math.trunc(dollarAllocated)}</span>
                </div>
                <div className='circle'>${showMore ? total.toFixed(2) : Math.trunc(total)}</div>
                <div className='total-cat'>
                    <span>${showMore ? percentageBalance.toFixed(2) : Math.trunc(percentageBalance)}</span>
                    <div className='line'/>
                    <span>%{percentageAllocated}</span>
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
                {dollar
                    .map((element, index) =>{
                        return( <EditDollar
                            key = {index}
                            index = {index}
                            id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}
                            updateDollar = {updateDollar}
                            total = {total}/>
                        )
                    })
                }
                {percent
                    .map((element, index) =>{
                        return( <EditPercent
                            key = {index}
                            index = {index}
                            id = {element.category_id}
                            category_name = {element.category_name}
                            category_allocated = {element.category_allocated}
                            category_type = {element.category_type}
                            category_balance = {element.category_balance}
                            catPenny = {catPenny}
                            setCatPennyFN = {setCatPenny}
                            updatePercent = {updatePercent}
                            changeName = {changeName}
                            remainder = {remainder}/>
                        )
                    })
                }
                <button className='icon' id='add' name='%' onClick={(e)=>addCategory(e)}>+ %</button>
                <button className='icon' id='add' name='$' onClick={(e)=>addCategory(e)}>+ $</button>
            </div>
            :
            <div className='list'>
                {props.category
                    .filter(element => element.category_type === '$')
                    .map((element, index) =>{
                        return( <Categories
                            key = {index}
                            id = {index}
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
                            id = {index}
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
        <h1>{remainder}</h1>
        <h1>percentage totals: {percent.reduce((acc, curr) => acc + curr.category_balance, 0).toFixed(2)}</h1>
    </div>)
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Budget);