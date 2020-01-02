import React, {useState} from 'react';

const Category = (props) => {
    const [showMore, toggleShowMore] = useState(false);

    return(
        <div 
            id='cat-main'
            onClick={()=>{toggleShowMore(showMore === true? false:true)}}>
            <div id='cat-info'>
                <h1 id ='cat-name'>{props.category_name}</h1>
                <div id='cat-math'>
                <h1 className = 'cat-gray'>${props.category_value} - ${props.category_spent} =</h1>
                <h1 id ='cat-remaining'>${props.category_value - props.category_spent}</h1>
                </div>
            </div>
            {showMore ?
                <div id='cat-extra'>
                    Edit
                    <p
                        onClick={()=>{props.removeFN(props.category_id)}}>
                        Delete
                        </p>
                </div>
                : null}
        </div>
    )
}
export default Category;