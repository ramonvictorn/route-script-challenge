import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@material-ui/core/Button';
import ModalSaveRoute from '../../components/ModalSaveRoute/ModalSaveRoute.jsx';
import './DirectionsServiceContainer.css';

import {
    toggleModal,
  } from '../../actions/general.js';

class DirectionServiceContainer extends Component{
    constructor(){
        super();
    }
    render(){
        let show = this.props.distance != null ? true : false;
        let comp = '';
        if(show){
            let duration = `${this.props.duration.toFixed(2)} minutos`; 
            if(parseInt(duration) > 60){
                if(duration % 60 != 0){
                    let hours = this.props.duration/60;
                    let hoursRounded = Math.floor(hours);
                    let minutes = Math.floor((hours - hoursRounded)*60);
                    duration = `${hoursRounded} hora(s) e ${minutes} minutos`;
                }else{
                    durarion = `${duration/60} horas`;
                }
            }
            comp = 
            <>
                <ModalSaveRoute></ModalSaveRoute>
                <p>
                    Esse trajeto possui <b>{this.props.distance.toFixed(2)}</b> Km de comprimento, 
                    e o tempo estimado é de aproximadamente <b>{duration}</b>
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
            <div className={'direction-service-container'}> 
            {comp}
                <Row className={'row-fix'} >
                    <Col>
                        <div id={'routes-description'} style={{height: !show ? '1px' : ''}}></div>
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
