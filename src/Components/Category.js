import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import Transactions from './Transactions';

const Category = (props) => {

    const [edit, toggleEdit] = useState(false);
    const [name, setNewName] = useState('');
    const [balance, setNewBalance] = useState('');
    // const [amount, setNewAmount] = useState(0);
    const [allocated, setNewAllocated] = useState(0);
    const [categoryID, setCategoryID] = useState(0);
    const [remove, toggleRemove] = useState(false);
    const [type]=useState('$');

    let current = props.category.filter(el => (
        el.category_name===props.match.params.category_name
    ))

    useEffect(()=>{
        setNewName(current[0] && current[0].category_name)
        setNewBalance(current[0] && (current[0].category_balance).toFixed(2));
        // setNewAmount(current[0] && (current[0].category_balance).toFixed(2));
        setCategoryID(current[0] && (current[0].category_id));
        setNewAllocated(current[0] && (current[0].category_allocated).toFixed(2));
    },[])

    const deleteCategory = () => {
        axios
            .delete(`/api/category/${categoryID}`)
            .then(props.history.push('/budget'))
            .catch(console.log('did not delete'))
    }

    const editCategory = () => {
        axios
            .put('/api/category', {name, balance, allocated, categoryID})
            .then(()=>{toggleEdit(!edit); console.log('category updated')})
            .catch(console.log('category not updated'))
    }

    return(
        <div>
            {remove ?
                <div id='outer-popup'>
                    <div id='inner-popup'>
                        <p>{name} still has <span>${balance}</span> in it.</p>
                        <p id='margin'>What would you like to do with that money?</p>
                        <button className='delete-button' onClick={()=>toggleRemove(false)}>Move it to Overflow</button>
                        <button className='delete-button' onClick={()=>toggleRemove(false)}>Move it to a Specific Category</button>
                        <button className='delete-button' onClick={()=>toggleRemove(false)}>Distribute it to Percentage</button>
                        <button className='delete-button' id='delete-delete' onClick={()=>deleteCategory()}>Delete it</button>
                        <button className='delete-button' id='delete-cancel' onClick={()=>toggleRemove(false)}>Cancel</button>
                    </div>
                </div>
                :null}
            
            <div className='header-main'>
                <Link to='/budget'><div className='icon' id='back'/></Link>
                {edit ? 
                    <form>
                    <input id = 'edit-name'
                        value = {name}
                        onChange={e=>setNewName(e.target.value)}/>
                    </form>
                    :
                    <h1 className = 'header-heading'>{name}</h1>}
                
                {/* <h1 className = 'header-heading'>CATEGORY</h1> */}
                <div className='icon' id='add'/>
            </div>
        <div className='main'>
            
            <div className='totals'>
                <div className='total-cat'>
                    <span>Allocated</span>
                    <div className='line'/>
                    {edit ?
                        <CurrencyInput 
                            value={allocated} 
                            onChange={(e, maskedVal, floatVal)=>setNewAllocated(maskedVal)}
                            prefix={type === '$'?"$":"%"}
                            precision={type === '$'?2:0}
                            id='edit-allocated'/>
                    :
                        <div>
                            {current[0] && current[0].category_type === '$'?"$":"%"}
                            {allocated}
                        </div>
                    }
                </div>
                <div className='circle'>
                    {edit ?
                    <CurrencyInput 
                        value={balance} 
                        onChange={(e, maskedVal, floatVal)=>setNewBalance(maskedVal)}
                        prefix={type === '$'?"$":"%"}
                        precision={type === '$'?2:0}
                        id='edit-total'/>
                    :
                    `$${balance}`}
                </div>
                <div className='total-cat'>
                    {edit?
                        <span onClick={()=>editCategory()}>Save</span> :
                        <span onClick={()=>toggleEdit(!edit)}>Edit</span>}
                    <div className='line'/>
                    {edit?
                        <span onClick={()=>toggleEdit(!edit)}>Cancel</span> :
                        <span onClick={()=>toggleRemove(true)}>Delete</span>}
                    {/* ${current[0] && (current[0].category_balance).toFixed(2)} */}
                </div>
            </div>
            <div className='header'>
                Transactions
            </div>
            <div className='white-space'>
                <span className='column-left'>Date</span>
                <span className='column'>Name</span>
                <span className='column-right'>Price</span>
            </div>
            <div className='list'>
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
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps)(Category);