import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect} from "react-router-dom";
import './Login.css';
import FormLoginContainer from '../../containers/FormLoginContainer/FormLoginContainer.jsx';

class Login extends Component {
    constructor(){
        super();
    }
    render(){
        if(this.props.isLogged){
            return <Redirect to='/routes'/>
        }
        return(
            <FormLoginContainer history={this.props.history}/>
        )
    }
}

const mapStateToProps = state => ({
    isLogged: state.general.isLogged,
});

const mapDispatchToProps = dispatch => ({
    _setIsLogged: (value) => dispatch(setIsLogged(value)),
});
export default connect(mapStateToProps,mapDispatchToProps)(Login);