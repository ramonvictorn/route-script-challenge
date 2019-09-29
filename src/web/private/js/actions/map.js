export const SET_ORIGIN = "SET_ORIGIN";
export const SET_DESTINATION = "SET_DESTINATION";
export const ADD_WAYPOINT = "ADD_WAYPOINT";
export const ADD_INPUT_AUTO_COMPLETE = 'ADD_INPUT_AUTO_COMPLETE';
export const SET_DISTANCE = "SET_DISTANCE";
export const SET_DURATION = 'SET_DURATION';

export const setOrigin = (origin) => ({ type: SET_ORIGIN, payload : {origin}});

export const setDestination = (destination) =>({
    type: SET_DESTINATION,
    payload: {destination}
});

export const addWaypoint = (waypoint) =>({
    type: ADD_WAYPOINT,
    payload: {waypoint}
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