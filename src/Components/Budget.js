import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCategory} from '../redux/reducer';
import * as d3 from d3;

const Budget = (props) => {
    const[budget] = useState(false);
    return (
        <div>
            {budget ?
            null : 
            <div
                id='budget-landing'>
                You don't have a budget yet. <br/>Let's make one!
                <Link to='/create-budget'>
                    <div
                        id='budget-default'>
                        <p id='budget-create'>Create New Budget</p>
                    </div>
                </Link>
            </div>}
        </div>
    )
}

const mapStateToProps = (reduxState) => {
    return reduxState
}

export default connect(mapStateToProps, {getCategory})(Budget);