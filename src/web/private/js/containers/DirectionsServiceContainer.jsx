import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { height } from '@material-ui/system';
class DirectionServiceContainer extends Component{
    constructor(){
        super();
    }
    render(){
        let show = this.props.distance != null ? true : false;
        let comp = '';
        if(show){
            comp = 
                <p>
                    Esse trajeto possui <b>{this.props.distance}</b> Km de comprimento, 
                    e o tempo estimado é de aproximadamente <b>{this.props.duration}</b> minutos
                </p>
                
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
export default connect(mapStateToProps)(DirectionServiceContainer);