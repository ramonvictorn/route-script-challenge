export const SET_ORIGIN = "SET_ORIGIN";
export const SET_DESTINATION = "SET_DESTINATION";


export const setOrigin = (origin) => ({ type: SET_ORIGIN, payload : {origin}});

export const setDestination = (destination) =>({
    type: SET_DESTINATION,
    payload: {destination}
});