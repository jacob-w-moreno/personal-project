import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import Slice from './Slice';
import axios from 'axios';

const PieChart = (props) => {
    const height = 400;
    const width = 400;
    let data = props.category;
    let pie = d3.pie()(props.data);

    useEffect(() => {
        console.log(props.data)},[])

    return(
        <svg height = {height} width ={width}>
            <g transform={`translate(${width /2},${height /2})`}>
                <Slice pie={pie} />
            </g>
        </svg>
    )
}

export default PieChart;