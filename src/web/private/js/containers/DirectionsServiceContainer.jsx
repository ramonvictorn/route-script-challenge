import React, {Component} from 'react';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class DirectionServiceContainer extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className={'directionServiceContainer'}> 
                <p>
                    Esse trajeto possui <b>{this.props.distance}</b> Km de comprimento, 
                    e o tempo estimado é de aproximadamente <b>{this.props.duration}</b> minutos
                </p>
                <Row className={'rowfix'} >
                    <Col>
                        <div id={'routesDescription'}></div>
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