import {
    SET_ORIGIN, 
    SET_DESTINATION,
} from '../actions/map.js';

const initialState = {
    origin: null,
    destination: null,
    waypoints : [],
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORIGIN:
            return {
                ...state, origin: action.payload.origin
            };
        case SET_DESTINATION:
            return{
                ...state,
                destination: action.payload.destination
            }
        default:
            return state;
    }
};

export default mapReducer;