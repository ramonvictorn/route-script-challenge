import {createStore, combineReducers} from  'redux';

// reducers
import mapReducer from './reducers/map.js';
import generalReducer from './reducers/general.js';

const reducer = combineReducers({
    maps : mapReducer,
    general: generalReducer,
})


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace:true})
);

export default store;