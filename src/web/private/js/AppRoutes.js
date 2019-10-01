import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store.js';
import HeaderMenu from './components/HeaderMenu.jsx';
// views
import RouterView from './views/RouterView.jsx';
import MyRouterView from './views/MyRoutes.jsx';

function AppRouter() {
    return (
      <Provider store={store}>
        <Router>
            <HeaderMenu></HeaderMenu>
            {/* <Switch> */}
            <Route exact path="/" component={RouterView} />
            <Route exact path="/myroutes" component={MyRouterView}></Route>
            {/* </Switch> */}
        </Router>
      </Provider>
    );
  }
  
  export default AppRouter;