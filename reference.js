import React, {useState, useEffect} from 'react';
import * as d3 from 'd3';
import Slice from './Slice';
import axios from 'axios';

const PieChart = (props) => {
    useEffect(() => {
    console.log(props.data)},[])

    var data = [{"letter":"q","presses":1},{"letter":"w","presses":5},{"letter":"e","presses":2}];
    var width = 300,
	height = 300,
    radius = Math.min(width, height) / 2;
    let color = d3.interpolateRgb("#eaaf79", "#bc3358");
    var pie = d3.pie()
    .value(function(d) { return d.presses; })(data);
    var arc = d3.arc()
	.outerRadius(radius - 10)
	.innerRadius(0);

    var labelArc = d3.arc()
	.outerRadius(radius - 40)
    .innerRadius(radius - 40);
    
    var svg = d3.select("#pie")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 +")");
        
    var g = svg.selectAll("arc")
	.data(pie)
	.enter().append("g")
    .attr("class", "arc");
    
    g.append("path")
	.attr("d", arc)
    .style("fill", function(d) { return color(d.data.letter);});
    
    g.append("text")
	.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
	.text(function(d) { return d.data.letter;})
	.style("fill", "#fff");

    return(
        <div id ='pie'></div>
    )
}

export default PieChart;