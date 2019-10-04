import React from 'react';
import ReactDOM from "react-dom";
import { Provider} from 'react-redux';
// import AppRoutes from './AppRoutes.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
// css
import '../css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// render(<AppRoutes/>, document.getElementById('app'));


import store from './store.js';
import AppRoutes from './AppRoutes.jsx';


ReactDOM.render(
    <Provider store={store}>
        <AppRoutes/>
    </Provider>
    ,
    document.getElementById("app")
);