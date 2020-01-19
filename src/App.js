import React from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import './AppR.css';
import './styles/style.css';
import './Reset.css';
import Header from './Components/Header';
import routes from './routes';

function App(props) {
return (
    <div className="App">
        {props.location.pathname === '/' || props.location.pathname === '/register' 
        || props.location.pathname === '/login'
        ? (<>
            {routes}
            </>)
        : (<>
            <Header />
            {routes}
            </>)}
    </div>
);
}

export default withRouter(App);
