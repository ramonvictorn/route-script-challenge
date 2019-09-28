import {createStore, combineReducers} from  'redux';

// reducers
import mapReducer from './reducers/map.js';

const reducer = combineReducers({
    maps : mapReducer,
})


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({trace:true})
);

export default store;