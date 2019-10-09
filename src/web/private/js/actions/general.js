export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SET_IS_LOGGED = 'SET_IS_LOGGED'
export const POST_MODAL_WARN = 'POST_MODAL_WARN';
export const DELETE_MODAL_WARN = 'DELETE_MODAL_WARN';
export const toggleModal = () => ({ type: TOGGLE_MODAL, payload : {}});
export const setIsLogged = (value) => ({type: SET_IS_LOGGED, payload:{value}});
export const postModalWarn = (modal) => ({type:POST_MODAL_WARN, payload:{modal}});
export const deleteModalWarn = (index) => ({type:DELETE_MODAL_WARN, payload:{index}})