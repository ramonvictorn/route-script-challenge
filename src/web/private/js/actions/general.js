export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_IS_LOGGED = 'SET_IS_LOGGED'

export const toggleModal = () => ({ type: TOGGLE_MODAL, payload : {}});
export const setIsLogged = (value) => ({type: SET_IS_LOGGED, payload:{value}})
