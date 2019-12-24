import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Register from './Components/Register';
import Landing from './Components/Landing';
import Login from './Components/Login';
import Budget from './Components/Budget';
import Transactions from './Components/Transactions';

export default (
    <Switch>
        <Route exact path = '/' component = {Landing}/>
        <Route path = '/register' component = {Register}/>
        <Route path = '/login' component = {Login}/>
        <Route path = '/budget' component = {Budget}/>
        <Route path = '/transactions' component = {Transactions}/>
    </Switch>
)