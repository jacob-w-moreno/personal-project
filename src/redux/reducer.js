const initialState = {
    user: {},
    category: [],
    transactions: []
}

const GET_USER = 'GET_USER';
const GET_CATEGORY = 'GET_CATEGORY';
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const LOGOUT = 'LOGOUT';

export function getUser(userObj){
    return {
        type: GET_USER,
        payload: userObj
    }
}

export function getCategory(catObj){
    return{
        type: GET_CATEGORY,
        payload: catObj
    }
}

export function getTransactions(transObj){
    return{
        type: GET_TRANSACTIONS,
        payload: transObj
    }
}

export function logout(){
    return{
        type: LOGOUT,
        payload: initialState
    }
}

export default function reducer(state = initialState, action){
    const{type, payload} = action;
    switch(type){
        case GET_USER:
            return {...state, user: payload};
        case GET_CATEGORY:
            return{...state, category: payload};
        case GET_TRANSACTIONS:
            return{...state, transactions: payload};
        case LOGOUT:
            return {payload};
        default:
            return state;
    }
}