import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store.js';
import HeaderMenu from './components/HeaderMenu.jsx';
// views
import RouterView from './views/RouterView.jsx';

function AppRouter() {
    return (
      <Provider store={store}>
        <Router>
            <HeaderMenu></HeaderMenu>
            {/* <Switch> */}

            <Route path="/" component={RouterView} />
            {/* </Switch> */}
        </Router>
      </Provider>
    );
  }
  
  export default AppRouter;