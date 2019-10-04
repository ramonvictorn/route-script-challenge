import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch ,Redirect} from "react-router-dom";
import { Provider ,connect} from 'react-redux';
import axios from 'axios';
import store from './store.js';
import HeaderMenu from './components/HeaderMenu.jsx';
// views
import LoginView from './views/Login.jsx'
import RouterView from './views/RouterView.jsx';
import MyRouterView from './views/MyRoutes.jsx';

import {
  setIsIogged,
} from './actions/general.js';

let tokenIsValid = ()=>{
  console.log('tokenIsValid');
  axios.get('/api/isLogged')
    .then((dataReq)=>{
      console.log('then ',dataReq);
      return(true);
    })
    .catch((dataReq)=>{
      console.log('catch',dataReq)
      return(false);
    })
}

function PrivateRoute ({component: Component, ...rest}) {
  // let response = tokenIsValid()
  return (
      <Route {...rest} render={props => (
          true == true ?
            <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};
class AppRouter extends Component {
  constructor(){
    super();
  }
  componentDidMount(){
    console.log('did mount do app routes')
  }
  render(){
    return (
      <Provider store={store}>
        <Router>
            <Route exact path="/login" component={LoginView} />
            <PrivateRoute exact path="/routes2" component={RouterView} />
            <Route exact path="/routes" component={RouterView} />
            <Route exact path="/myroutes" component={MyRouterView}></Route>
        </Router>
      </Provider>
    );
  }
}
  
const mapStateToProps = state => ({
  isLogged: state.genenal.isLogged
});

const mapDispatchToProps = dispatch => ({
  setIsLogged: (value) => dispatch(setIsLogged(value)),
});
// export default connect(mapStateToProps,mapDispatchToProps)(AppRouter);
export default AppRouter