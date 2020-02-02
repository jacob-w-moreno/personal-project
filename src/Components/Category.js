import React, {useState, useEffect} from 'react';
import CurrencyInput from 'react-currency-input';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Transactions from './Transactions';

const Category = (props) => {

    const [edit, toggleEdit] = useState(false);
    const [editCatName, toggleEditCatName] = useState(false);
    const [name, setNewName] = useState('');
    const [total, setNewTotal] = useState('');
    const[amount, setNewAmount] = useState(0);
    const [remove, toggleRemove] = useState(true);
    const[type, setType]=useState('Dollar');

    let current = props.category.filter(el => (
        el.category_name===props.match.params.category_name
    ))

    useEffect(()=>{
        setNewName(current[0] && current[0].category_name)
        setNewTotal(current[0] && (current[0].category_balance).toFixed(2));
        setNewAmount(current[0] && (current[0].category_balance).toFixed(2));
    },[])

    console.log('current[0]:', current[0])
    console.log('NEW NAME:', name);

    console.log(edit);
    return(
        <div>
            {remove ?
                <div id='outer-popup'>
                    <div id='inner-popup'>
                        <p>Are you sure you want to delete {name}?</p>
                        <p>This cannot be undone.</p>
                        <button>Delete</button>
                        <button>Cancel</button>
                    </div>
                </div>
                :null}
            
            <div className='header-main'>
                <Link to='/budget'><div className='icon' id='back'/></Link>
                {editCatName ? 
                    <input className = 'input-category-name'
                        value = {name}
                        onChange={e=>setNewName(e.target.value)}/>
                    :
                    <h1 className = 'header-heading'
                        onClick={()=>toggleEditCatName(true)}>{name}</h1>}
                
                {/* <h1 className = 'header-heading'>CATEGORY</h1> */}
                <div className='icon' id='add'/>
            </div>
        <div className='main'>
            
            <div className='totals'>
                <div className='total-cat'>
                    <span>Allocated</span>
                    <div className='line'/>
                    {current[0] && current[0].category_type === 'Dollar'?"$":"%"}
                    {current[0] && current[0].category_allocated}
                </div>
                <div className='circle'>
                    {edit ?
                    <CurrencyInput 
                        value={amount} 
                        onChange={(e, maskedVal, floatVal)=>setNewAmount(maskedVal)}
                        prefix={type === 'Dollar'?"$":"%"}
                        precision={type === 'Dollar'?2:0}
                        className='form-input'/>
                    :
                    `$${total}`}
                </div>
                <div className='total-cat'>
                    {edit?
                        <span onClick={()=>toggleEdit(!edit)}>Save</span> :
                        <span onClick={()=>toggleEdit(!edit)}>Edit</span>}
                    <div className='line'/>
                    {edit?
                        <span onClick={()=>toggleEdit(!edit)}>Cancel</span> :
                        <span onClick={()=>toggleRemove(!remove)}>Delete</span>}
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