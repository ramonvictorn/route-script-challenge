import {
    SET_ORIGIN, 
    SET_DESTINATION,
    ADD_WAYPOINT,
    ADD_INPUT_AUTO_COMPLETE,
    SET_DISTANCE,
    SET_DURATION,
} from '../actions/map.js';

const initialState = {
    idsInputAutoComplete: [],
    origin: null,
    destination: null,
    waypoints : [],
    distance : null,
    duration : null,
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
        case ADD_INPUT_AUTO_COMPLETE:
            let inputs = [...state.idsInputAutoComplete];
            inputs.push(action.payload.idInput);
            return {
                ...state,
                idsInputAutoComplete: inputs,
            };
        case SET_DISTANCE:
            return {
                ...state,
                distance:action.payload.distance,
            }
        case SET_DURATION:
            return {
                ...state,
                duration:action.payload.duration,
            }
        default:
            return state;
    }
};

export default mapReducer;