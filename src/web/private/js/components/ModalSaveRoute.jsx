import React,{Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import {
    toggleModal,
} from '../actions/general.js';

class ModalSaveRoute extends Component{
    constructor(){
        super();
        this.saveData = this.saveData.bind(this);
    }
    saveData(){
        axios.post("/api/routes")
        .then((data)=>{
            console.log('data MODAL-SAVE-ROUTE', data)
        })
        .catch((err)=>{
            console.log('err MODAL-SAVE-ROUTE', err.response)
        })
    }
    render(){
        console.log('ModalSaveRoute ----', this.props)
        return(
            <>
            <Modal show={this.props.showModal} onHide={()=>this.props._toggleModal()}>
                <Modal.Header closeButton>
                <Modal.Title>Salvar rota</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <p>Digite um nome para a rota</p>
                            <Input placeholder="ex: Viagem entrega #46"/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="contained" color="primary" onClick={()=>{}}>
                    Cancelar
                </Button>
                <Button variant="contained" color="secondary" onClick={()=>this.saveData()}>
                    Salvar rota
                </Button>
                </Modal.Footer>
            </Modal>
            </>
        )
    }
}
const mapStateToProps = state => ({
    showModal: state.general.showModal,
})
const mapDistpacthToProps = dispatch => ({
    _toggleModal: () => dispatch(toggleModal()),
 });
export default connect(mapStateToProps,mapDistpacthToProps)(ModalSaveRoute);