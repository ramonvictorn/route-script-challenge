import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputAutoComplete from '../presentational/InputAutoComplete.js';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

// action
import {
  setOrigin,
  setDestination,
} from '../actions/map.js';

class FormSeach extends Component {
  constructor(){
    super();
    this.roteirizar = this.roteirizar.bind(this);
  }
 
  roteirizar(){
    let markerArray = []
    console.log('roteiriar 3', this.props);
    var loc1 = new google.maps.LatLng(28.407222, 49.546110999999996);
    var loc2 = new google.maps.LatLng(27.6474254, 48.66895060000002);
    var request = {
        origin: this.props.origin.formatted_address,
        destination: this.props.destination.formatted_address,
        waypoints: this.props.waypoints,
        travelMode: 'DRIVING'
    };
    window.mapServices.directionsRenderer.setMap(window.mapServices.map);
    calculateAndDisplayRoute(window.mapServices.directionsService, window.mapServices.directionsRenderer);
    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
      directionsService.route(
          request,
          function(response, status) {
            if (status === 'OK') {
              console.log('deu ok ->directionsRenderer ', directionsRenderer)
              directionsRenderer.setDirections(response);
              directionsRenderer.setMap(window.mapServices.map);
              directionsRenderer.setPanel(document.getElementById('routesDescription'));
              var control = document.getElementById('routesDescription');
              control.style.display = 'block';
              // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    }
  }
  componentDidMount(){
    // document.getElementById('origemInput').addEventListener('change', (e)=> console.log('oi ', e.target.value));
    // document.getElementById('destinoInput').addEventListener('change',  (e)=> this.props._setDestination(e.target.value));
  }
  render(){
    // console.log("FormSeach render - props -> ", this.props);
    return (
      <div className='formRoute'>
        <Row>
            <Col>Origem</Col>
        </Row>
        <Row>
            <Col>
                <Input
                    defaultValue=""
                    onChange={(e)=>{ this.props._setOrigin(e.target.value)}}
                    id={'origemInput'}
                    inputProps={{
                    'aria-label': 'description',
                    }}
                />
            </Col>
        </Row>
        <Row>
            <Col>Destino</Col>
        </Row>
        <Row>
            <Col>
                <Input
                    defaultValue=""
                    id={'destinoInput'}
                    onChange={(e)=>{this.props._setDestination(e.target.value)}}
                    inputProps={{
                    'aria-label': 'description',
                    }}
                />
                <Fab size="small" color="secondary" aria-label="add" className={'classes.margin'}>
                    <AddIcon />
                </Fab>
            </Col>
        </Row>
        <Button variant="contained" color="primary" className={'classes.button'} onClick={()=> this.roteirizar()}>
          Roteirizar
      </Button>
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
  origin : state.maps.origin,
  destination: state.maps.destination,
  waypoints: state.maps.waypoints,
})

const mapDistpacthToProps = dispatch => ({
   _setOrigin: origin => dispatch(setOrigin(origin)),
   _setDestination: destination => dispatch(setDestination(destination)),
});
export default connect(mapStateToProps,mapDistpacthToProps)(FormSeach);