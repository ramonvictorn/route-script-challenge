import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch ,Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';
// views
import LoginView from './views/Login/Login.jsx'
import RouterView from './views/RouterView/RouterView.jsx';
import MyRouterView from './views/MyRoutes/MyRoutes.jsx';

import {
  setIsLogged,
} from './actions/general.js';


function PrivateRoute ({component: Component, ...rest}) {
  // let response = tokenIsValid()
  // console.log('PrivateRoute ---------------------', rest.isLogged)
  return (
      <Route {...rest} render={props => (
        rest.isLogged == true ?
            <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};
class AppRoutes extends Component {
  constructor(){
    super();
    this.isLogged = this.isLogged.bind(this);
  }
  componentDidMount(){
    this.isLogged();
  }

  isLogged(){
    axios.get('/api/isLogged')
    .then((data)=>{
      this.props._setIsLogged(true);
    })
    .catch((data)=>{
      this.props._setIsLogged(false);
    })
  }
  render(){
    const isLogged = this.props.isLogged;
    if (isLogged == null) {
        return <div></div>
    }
    return (
        <Router>
            <Route exact path="/login" component={LoginView} />
            <PrivateRoute exact path="/routes" component={RouterView} isLogged={this.props.isLogged}/>
            <PrivateRoute exact path="/myroutes" component={MyRouterView} isLogged={this.props.isLogged}/>
        </Router>
    );
  }
}
  
const mapStateToProps = state => ({
  isLogged: state.general.isLogged,
});

const mapDispatchToProps = dispatch => ({
  _setIsLogged: (value) => dispatch(setIsLogged(value)),
});
export default connect(mapStateToProps,mapDispatchToProps)(AppRoutes);