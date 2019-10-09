import {
   TOGGLE_MODAL,
   SET_IS_LOGGED,
   POST_MODAL_WARN,
   DELETE_MODAL_WARN,
} from '../actions/general.js';

const initialState = {
    showModal : false,
    isLogged: null,
    modalsWarn: [],
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
        case POST_MODAL_WARN:
            let newsModalWarn = [...state.modalsWarn];
            newsModalWarn.push({
                message:action.payload.modal.message,
                show:action.payload.modal.show,
            })
            return{
                ...state,
                modalsWarn:newsModalWarn,
            }
        case DELETE_MODAL_WARN:
            let warnRemoved = [...state.modalsWarn];
            warnRemoved[action.payload.index].show = false;
            return {
                ...state,
                modalsWarn : warnRemoved,
            }
        default:
            return state;
    }
};

export default generalReducer;