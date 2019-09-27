import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// views
import RouterView from './views/RouterView.jsx'

function AppRouter() {
    return (
      <Router>
          <Route path="/" component={RouterView} />
      </Router>
    );
  }
  
  export default AppRouter;