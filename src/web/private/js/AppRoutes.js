import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from 'react-redux';

import store from './store.js';
// views
import RouterView from './views/RouterView.jsx'

function AppRouter() {
    return (
      <Provider store={store}>
        <Router>
            <Route path="/" component={RouterView} />
        </Router>
      </Provider>
    );
  }
  
  export default AppRouter;