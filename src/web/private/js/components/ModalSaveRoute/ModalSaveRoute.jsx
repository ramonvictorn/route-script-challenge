import React,{Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import './ModalSaveRoute.css';
import {
    toggleModal,
} from '../../actions/general.js';

class ModalSaveRoute extends Component{
    constructor(){
        super();
        this.saveData = this.saveData.bind(this);
        this.inputTitle = React.createRef();
    }
    saveData(){
        let data = {
            title:this.inputTitle.current.value,
        }
        let newWaypoints = this.props.waypoints.map((el,idx)=>{
            return (
                {
                    place:el.place,
                }
            )
        })
        data.waypoints = newWaypoints;
        axios.post("/api/routes", data)
        .then((data)=>{
            this.props._toggleModal();
        })
        .catch((err)=>{
            console.log('error MODAL-SAVE-ROUTE', err.response)
        })
    }
    render(){
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
                            <input ref={this.inputTitle} placeholder="ex: Viagem entrega #46"/>
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
    waypoints: state.maps.waypoints,
})
const mapDistpacthToProps = dispatch => ({
    _toggleModal: () => dispatch(toggleModal()),
 });
export default connect(mapStateToProps,mapDistpacthToProps)(ModalSaveRoute);