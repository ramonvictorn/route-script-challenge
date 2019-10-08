import React,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class FormLogin extends Component{
    constructor(){
        super();
        this.inputPassword = React.createRef();
        this.inputEmail = React.createRef();
        this.getValuesAndFetch = this.getValuesAndFetch.bind(this);
    }
    getValuesAndFetch(){
        let data = {
            email:this.inputEmail.current.value,
            password:this.inputPassword.current.value
        }
        this.props.login(data);
    }
    render(){
        return (
            <>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Digite seu email" ref={this.inputEmail}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="Password"  ref={this.inputPassword}/>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={()=>{this.getValuesAndFetch()}}>
                        Login
                    </Button>
                </Form>
            </>)
    }
}
export default FormLogin;