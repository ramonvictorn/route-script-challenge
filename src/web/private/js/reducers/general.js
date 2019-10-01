import {
   TOGGLE_MODAL
} from '../actions/general.js';

const initialState = {
    showModal : false,
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            let newStatusModal = !state.showModal;
            console.log('TOGGLE_MODAL - new ', newStatusModal ,'state ', state.showModal )
            return {
                ...state, showModal: newStatusModal,
            };
        default:
            return state;
    }
};

export default generalReducer;