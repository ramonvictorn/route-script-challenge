export const SET_ORIGIN = "SET_ORIGIN";
export const SET_DESTINATION = "SET_DESTINATION";
export const ADD_WAYPOINT = "ADD_WAYPOINT";

export const setOrigin = (origin) => ({ type: SET_ORIGIN, payload : {origin}});

export const setDestination = (destination) =>({
    type: SET_DESTINATION,
    payload: {destination}
});

export const addWaypoint = (waypoint) =>({
    type: ADD_WAYPOINT,
    payload: {waypoint}
});