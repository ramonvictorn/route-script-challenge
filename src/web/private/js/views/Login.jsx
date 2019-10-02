import React, {Component} from 'react';
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
class Login extends Component {
    constructor(){
        super();
        this.fetchFogin = this.fetchFogin.bind(this);
    }

    fetchFogin(){
        console.log("fetchFogin");
        let dataForm ={
            email:'ramon',
            password:'ramon123',
        }
        axios.post('/api/login',dataForm)
            .then((data)=>{
                console.log("the -> ",data)
            })
            .catch((err)=>{
                console.log('catch ', err.response)
            })
    }
    render(){
        return(
            <>
            <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={this.fetchFogin}>
                    Submit
                </Button>
            </Form>
            </div>
            </>
        )
    }
}
export default connect()(Login);