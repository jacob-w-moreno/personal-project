const initialState = {
    user: {},
    category: []
}

const GET_USER = 'GET_USER';
const GET_CATEGORY = 'GET_CATEGORY';

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

export default function reducer(state = initialState, action){
    const{type, payload} = action;
    switch(type){
        case GET_USER:
            return {...state, user: payload};
        case GET_CATEGORY:
            return{...state, category: payload};
        default:
            return state;
    }
}