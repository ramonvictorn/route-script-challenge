import {
   TOGGLE_MODAL,
   SET_IS_LOGGED,
} from '../actions/general.js';

const initialState = {
    showModal : false,
    isLogged: null,
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            let newStatusModal = !state.showModal;
            return {
                ...state, showModal: newStatusModal,
            };
        case SET_IS_LOGGED:
            return{
                ...state,
                isLogged:action.payload.value,
            }
        default:
            return state;
    }
};

export default generalReducer;