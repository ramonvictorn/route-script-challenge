import React, {Component} from 'react';
import { connect} from 'react-redux';
import axios from 'axios';
import FormLogin from '../../components/FormLogin/FormLogin.jsx';

import {
    setIsLogged,
} from '../../actions/general.js';

class FormLoginContainer extends Component {
    constructor(){
        super();
        this.fetchFogin = this.fetchFogin.bind(this);
    }
    fetchFogin(data){
        let dataForm ={
            email:data.email,
            password:data.password,
        }
        axios.post('/api/login',dataForm)
            .then((data)=>{
                this.props._setIsLogged(true);
                this.props.history.push('/routes');
            })
            .catch((err)=>{
                console.log('error login', err.response)
            }
        )
    }
    render(){
        return (
            <div>
                <FormLogin login={(data)=>this.fetchFogin(data)}/> 
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isLogged: state.general.isLogged,
});

const mapDispatchToProps = dispatch => ({
    _setIsLogged: (value) => dispatch(setIsLogged(value)),
});
export default connect(mapStateToProps,mapDispatchToProps)(FormLoginContainer);