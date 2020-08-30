import { SET_CURRENT_USER} from '../actions/types';

const initialState = {
    user: {},
    validToken: false
};

const setValidToken = payload => {
    return payload ? true : false;
}

export default function(state = initialState, action){
    switch (action.type){
        case SET_CURRENT_USER:
        return {
            ...state,
            user: action.payload,
            validToken: setValidToken(action.payload)
        };
       
        default:
            return state;
    }
}