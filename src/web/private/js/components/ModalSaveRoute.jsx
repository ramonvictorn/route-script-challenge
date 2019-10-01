import React,{Component} from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';

class ModalSaveRoute extends Component{
    constructor(){
        super();
    }
    render(){
        console.log('ModalSaveRoute ----', this.props)
        return(
            <>
            <Modal show={this.props.showModal} onHide={()=>{}}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="contained" color="primary" onClick={()=>{}}>
                    Close
                </Button>
                <Button variant="contained" color="secondary" onClick={()=>{}}>
                    Save Changes
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
export default connect(mapStateToProps)(ModalSaveRoute);