import {
    SET_ORIGIN, 
    SET_DESTINATION,
    ADD_WAYPOINT,
    ADD_INPUT_AUTO_COMPLETE,
    SET_DISTANCE,
    SET_DURATION,
    SET_MY_ROUTES,
    SET_WAYPOINTS,
    SET_MAP_SCRIPT_INSERTED,
    SET_MODE_EDIT_ROUTE,
} from '../actions/map.js';

const initialState = {
    idsInputAutoComplete: [],
    origin: null,
    destination: null,
    waypoints : [],
    distance : null,
    duration : null,
    myRoutes: [],
    scriptMapInserted: false,
    modeEditRoute: true,
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
            if(state.waypoints.length < action.payload.data.idx){
                let waypoints = [...state.waypoints];
                waypoints.push(action.payload.data.place)
                return{
                    ...state,
                    waypoints: waypoints,
                }
            }else{
                let waypoints = [...state.waypoints];
                waypoints[action.payload.data.idx] = action.payload.data.place;
                return{
                    ...state,
                    waypoints: waypoints,
                }
            }
        case SET_WAYPOINTS:
            return{
                ...state,
                waypoints:action.payload.data,
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
        case SET_MY_ROUTES:
            return {
                ...state,
                myRoutes: action.payload.routes,
            }
        case SET_MAP_SCRIPT_INSERTED:
            return{
                ...state,
                scriptMapInserted:action.payload.value,
            }
        case SET_MODE_EDIT_ROUTE:
            return{
                ...state,
                modeEditRoute:action.payload.value,
            }
        default:
            return state;
    }
};

export default mapReducer;