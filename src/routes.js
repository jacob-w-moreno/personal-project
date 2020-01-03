import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Register from './Components/Register';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Budget from './Components/Budget';
import Transactions from './Components/Transactions';
import CreateBudget from './Components/CreateBudget';
import CreateCategory from './Components/CreateCategory';
import CreateTransaction from './Components/CreateTransaction';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route path = '/register' component = {Register}/>
        <Route path = '/login' component = {Login}/>
        <Route path = '/budget' component = {Budget}/>
        <Route path = '/transactions' component = {Transactions}/>
        <Route path = '/create-budget' component = {CreateBudget}/>
        <Route path = '/create-category' component = {CreateCategory}/>
        <Route path = '/create-transaction' component = {CreateTransaction}/>
    </Switch>
)