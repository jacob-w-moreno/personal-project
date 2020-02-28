// import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import {getCategory} from '../redux/reducer';
// import PieChart from './PieChart';
// import axios from 'axios';

// const UselessBudget = (props) => {
    
//     let data = props.category.map(el => el.category_allocated)
    
//     useEffect(() => {
//         getCategory()}, [])

//     const getCategory = () => {
//         axios
//             .get('/api/category')
//             .then((res) => {
//                 props.getCategory(res.data)
//             })
//             .catch(() => console.log('did not get categories'))
//     }

//     return (
//         <div>
//             <span style={{
//                 position: 'absolute',
//                 right: '50%',
//                 top: '80px',
//                 color: 'white',
//                 fontSize: '25px',
//                 transform: 'translateX(+50%)',
//                 width: '100%'
//             }}>Budget at a Glance</span>
            
//                 <PieChart
//                     data = {data}></PieChart>
//             <span 
//                 style ={{
//                     position: 'absolute',
//                     bottom: '250px',
//                     left: 0,
//                     color: 'white',
//                     fontSize: '25px',
//                     margin: '20px'
//                 }}>
//                 Categories:
//             </span>
//             <div
//                 style={{
//                     display: 'flex',
//                     width: 200,
//                     flexDirection: 'column',
//                 }}>
//             <div style={{
//                 display: 'flex',
//                 marginLeft: 80
//             }}>
//                 <span>
//                     Food
//                 </span>
//                 <div style={{
//                     background: 'rgb(233,175,121)',
//                     height: 10,
//                     width: 10,
//                     marginLeft: 20
//                     }}>
//                 </div>
//             </div>
//             <div style={{
//                 display: 'flex',
//                 marginLeft: 80
//             }}>
//                 <span>
//                     Data
//                 </span>
//                 <div style={{
//                     background: 'rgb(223,143,113)',
//                     height: 10,
//                     width: 10,
//                     marginLeft: 20
//                     }}>
//                 </div>
//             </div>
//             <div style={{
//                 display: 'flex',
//                 marginLeft: 80
//             }}>
//                 <span>
//                     Rent
//                 </span>
//                 <div style={{
//                     background: 'rgb(210,113,104)',
//                     height: 10,
//                     width: 10,
//                     marginLeft: 20
//                     }}>
//                 </div>
//             </div>
//             <div style={{
//                 display: 'flex',
//                 marginLeft: 80
//             }}>
//                 <span>
//                     Candles
//                 </span>
//                 <div style={{
//                     background: 'rgb(201,81,96)',
//                     height: 10,
//                     width: 10,
//                     marginLeft: 20
//                     }}>
//                 </div>
//             </div>
//             <div style={{
//                 display: 'flex',
//                 marginLeft: 80
//             }}>
//                 <span>
//                     Utility
//                 </span>
//                 <div style={{
//                     background: 'rgb(188,54,88)',
//                     height: 10,
//                     width: 10,
//                     marginLeft: 20
//                     }}>
//                 </div>
//             </div>
//             </div>
//         </div>
//     )
// }

// const mapStateToProps = (reduxState) => {
//     return reduxState
// }

// export default connect(mapStateToProps, {getCategory})(UselessBudget);