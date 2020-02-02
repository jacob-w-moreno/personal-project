import React from 'react';
import {Switch, Route} from 'react-router-dom';
// import Register from './Components/Register';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Transactions from './Components/Transactions';
import Budget from './Components/Budget';
import CreateCategory from './Components/CreateCategory';
import CreateTransaction from './Components/CreateTransaction';
import Category from './Components/Category';
import UselessBudget from './Components/UselessBudget';
import AddIncome from './Components/AddIncome';
import History from './Components/History';

export default (
    <Switch>
        <Route exact path = '/' component = {Login}/>
        <Route path = '/register' component = {Landing}/>
        {/* <Route path = '/login' component = {Login}/> */}
        <Route path = '/budget' component = {Budget}/>
        <Route path = '/transactions' component = {Transactions}/>
        <Route path = '/create-category' component = {CreateCategory}/>
        <Route path = '/create-transaction' component = {CreateTransaction}/>
        <Route path = '/add-income' component = {AddIncome}/>
        <Route path = '/pie-chart' component = {UselessBudget}/>
        <Route path = '/category/:category_name' component = {Category}/>
        <Route path = '/history' component = {History}/>
    </Switch>
)