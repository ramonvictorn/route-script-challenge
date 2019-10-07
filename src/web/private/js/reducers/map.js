import {
    ADD_WAYPOINT,
    SET_DISTANCE,
    SET_DURATION,
    SET_MY_ROUTES,
    SET_WAYPOINTS,
    SET_MAP_SCRIPT_INSERTED,
    SET_MODE_EDIT_ROUTE,
    SET_REQUEST_MAP_OBJECT,
    REMOVE_WAYPOINT_BY_INDEX,
    SET_PLACE_WAYPOINT,
} from '../actions/map.js';

const initialState = {
    waypoints : [],
    distance : null,
    duration : null,
    myRoutes: [],
    scriptMapInserted: false,
    modeEditRoute: true,
    requestMapObject: null,
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WAYPOINT:
            let waypoints = [...state.waypoints];
                waypoints[action.payload.data.index]= action.payload.data;
                return{
                    ...state,
                    waypoints: waypoints,
                }
        case SET_WAYPOINTS:
            console.log("SET_WAYPOINTS ", action.payload)
            return{
                ...state,
                waypoints:action.payload.data,
            }
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
        case SET_REQUEST_MAP_OBJECT:
            return{
                ...state,
                requestMapObject:action.payload.object,
            }
        case REMOVE_WAYPOINT_BY_INDEX:
            let newWaypoints = [...state.waypoints];
            newWaypoints.splice(action.payload.index,1);
            return {
                ...state,
                waypoints:newWaypoints,
            }
        case SET_PLACE_WAYPOINT:
            let oldWaypoints = [...state.waypoints];
            oldWaypoints[action.payload.data.index].place = action.payload.data.place;
            return {
                ...state,
                waypoints:oldWaypoints,
            }
        default:
            return state;
    }
};

export default mapReducer;