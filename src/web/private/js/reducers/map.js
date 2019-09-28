import {
    SET_ORIGIN, 
    SET_DESTINATION,
    ADD_WAYPOINT,
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
        case ADD_WAYPOINT:
            let waypoints = [...state.waypoints];
            waypoints.push(action.payload.waypoint)
            return{
                ...state,
                waypoints: waypoints,
            }
        default:
            return state;
    }
};

export default mapReducer;