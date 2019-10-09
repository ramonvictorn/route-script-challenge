import React,{Component} from 'react';
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import CloseIcon from '@material-ui/icons/Close';
import './FormLogin.css';

// actions
import {
    postModalWarn,
    deleteModalWarn,
} from '../../actions/general.js';
class FormLogin extends Component{
    constructor(){
        super();
        this.inputPassword = React.createRef();
        this.inputEmail = React.createRef();
        this.getValuesAndFetch = this.getValuesAndFetch.bind(this);
        this.addModalWarn = this.addModalWarn.bind(this);
        this.eraseModal = this.eraseModal.bind(this);
    }
    addModalWarn(){
        this.props._postModalWar({
            message:'Preencha todos os campos antes de clicar em login!',
            show:true,
        })
    }
    getValuesAndFetch(){
        let data = {
            email:this.inputEmail.current.value,
            password:this.inputPassword.current.value
        }
        if(data.email.length == 0 || data.password.length == 0 ){
            this.addModalWarn();
            return;
        }
        this.props.login(data);
    }
    eraseModal(idx){
        this.props._deleteModalWarn(idx);
    }
  
    render(){
        let modals = this.props.modalsWarn.map((el,index)=>{
            if(el.show){
                return (
                    <Alert key={index} variant='danger'> 
                        {el.message}  <CloseIcon onClick={()=>this.eraseModal(index)}/>
                    </Alert>
                )
            }
        })
        return (
            <>
                <div className={'modals-container'}>
                    {modals}
                </div>
                <img className={'logo'} src='assets/images/logo.png'></img>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="Digite seu email" ref={this.inputEmail}/>
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

const mapStateToProps = state => ({
    modalsWarn: state.general.modalsWarn,
});

const mapDispatchToProps = dispatch => ({
    _postModalWar: (modal) => dispatch(postModalWarn(modal)),
    _deleteModalWarn: (index) => dispatch(deleteModalWarn(index)),
});
export default connect(mapStateToProps,mapDispatchToProps)(FormLogin);