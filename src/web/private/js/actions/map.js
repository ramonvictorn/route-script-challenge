export const SET_ORIGIN = "SET_ORIGIN";
export const SET_DESTINATION = "SET_DESTINATION";
export const ADD_WAYPOINT = "ADD_WAYPOINT";
export const SET_WAYPOINTS = "SET_WAYPOINTS";
export const ADD_INPUT_AUTO_COMPLETE = 'ADD_INPUT_AUTO_COMPLETE';
export const SET_DISTANCE = "SET_DISTANCE";
export const SET_DURATION = 'SET_DURATION';
export const SET_MY_ROUTES = 'SET_MY_ROUTES';

export const setOrigin = (origin) => ({ type: SET_ORIGIN, payload : {origin}});

export const setDestination = (destination) =>({
    type: SET_DESTINATION,
    payload: {destination}
});

export const addWaypoint = (data) =>({
    type: ADD_WAYPOINT,
    payload: {data}
});

export const setWaypoints = (data) =>({
    type: SET_WAYPOINTS,
    payload: {data}
});

export const addInputAutocomplete = (idInput) =>({
    type: ADD_INPUT_AUTO_COMPLETE,
    payload: {idInput},
})

export const setDistance = (distance) => ({
    type: SET_DISTANCE,
    payload: {distance},
})
export const setDuration = (duration) => ({
    type: SET_DURATION,
    payload: {duration},
})

export const setMyRoutes = (routes) => ({
    type: SET_MY_ROUTES,
    payload: {routes},
})