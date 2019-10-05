import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Login.css';

import {
    setIsLogged,
} from '../../actions/general.js';

class Login extends Component {
    constructor(){
        super();
        this.fetchFogin = this.fetchFogin.bind(this);
        this.inputPassword = React.createRef();
        this.inputEmail = React.createRef();
    }

    fetchFogin(){
        let dataForm ={
            email:this.inputEmail.current.value,
            password:this.inputPassword.current.value,
        }
        axios.post('/api/login',dataForm)
            .then((data)=>{
                console.log("then -> ",data, this.props.history);
                this.props._setIsLogged(true);
                this.props.history.push('/routes');
            })
            .catch((err)=>{
                console.log('catch ', err.response)
            })
    }
    render(){
        console.log('LOGIN RENDER', this.props)
        return(
            <>
            <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Digite seu email" ref={this.inputEmail}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Password"  ref={this.inputPassword}/>
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.fetchFogin}>
                    Login
                </Button>
            </Form>
            </div>
            </>
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