import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';

import ModalSaveRoute from '../components/ModalSaveRoute.jsx';



import {
    toggleModal,
  } from '../actions/general.js';

class DirectionServiceContainer extends Component{
    constructor(){
        super();
    }
    render(){
        console.log('DirectionServiceContainer ', this.props)
        let show = this.props.distance != null ? true : false;
        let comp = '';
        if(show){
            comp = 
            <>
                <ModalSaveRoute></ModalSaveRoute>
                <p>
                    Esse trajeto possui <b>{this.props.distance}</b> Km de comprimento, 
                    e o tempo estimado é de aproximadamente <b>{this.props.duration}</b> minutos
                </p>
                <Button variant="contained" color="secondary" onClick={()=> this.props._toggleModal()}>
                    Salvar em minhas rotas
                </Button>
            </>
                
        }else{
            comp = (<p>
                Insira seu destino e clique em roteirizar para iniciar!
            </p>)
        }
        return(
            <div className={'directionServiceContainer'}> 
            {comp}
                <Row className={'rowfix'} >
                    <Col>
                        <div id={'routesDescription'} style={{height: !show ? '1px' : ''}}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    duration : state.maps.duration,
    distance: state.maps.distance,
})
const mapDistpacthToProps = dispatch => ({
    _toggleModal: () => dispatch(toggleModal()),
 });
export default connect(mapStateToProps,mapDistpacthToProps)(DirectionServiceContainer);
