import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch ,Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import axios from 'axios';
import HeaderMenu from './components/HeaderMenu.jsx';
// views
import LoginView from './views/Login.jsx'
import RouterView from './views/RouterView.jsx';
import MyRouterView from './views/MyRoutes.jsx';

import {
  setIsLogged,
} from './actions/general.js';


function PrivateRoute ({component: Component, ...rest}) {
  // let response = tokenIsValid()
  console.log('PrivateRoute ---------------------', rest.isLogged)
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
    console.log('did mount do app routes');
    this.isLogged();
  }

  isLogged(){
    axios.get('/api/isLogged')
    .then((data)=>{
      console.log('isLogged then ', data);
      this.props.setIsLogged(true);
    })
    .catch((data)=>{
      console.log('isLogged catch ', data);
      this.props.setIsLogged(false);
    })
  }
  render(){
    console.log('AppRoutes ', this.props);
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
  setIsLogged: (value) => dispatch(setIsLogged(value)),
});
export default connect(mapStateToProps,mapDispatchToProps)(AppRoutes);
// export default AppRoutes