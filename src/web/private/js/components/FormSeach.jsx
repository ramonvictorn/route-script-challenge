import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';

// action
import {
  setOrigin,
  setDestination,
  addWaypoint,
  addInputAutocomplete,
  setDistance,
  setDuration,
} from '../actions/map.js';


class FormSeach extends Component {
  constructor(){
    super();
    this.roteirizar = this.roteirizar.bind(this);
    this.addWaypoints = this.addWaypoints.bind(this);
    this.addInputWaypoint = this.addInputWaypoint.bind(this);
  }
  addWaypoints(){
      console.log("addWaypoints");
      this.props._addWaypoint({location: 'Rua Marino Jorge dos Santos, 684 - São Sebastiao, Palhoça - SC',
      stopover: true})
  }
  addInputWaypoint(){
    let newId = `waypoint${this.props.idsInputAutoComplete.length}`;
    console.log('addInputWaypoint ', this.props.idsInputAutoComplete, ' novo id ', newId);
    // this.props._addWaypoint(newId);
    this.props._addInputAutocomplete(newId);
  }
  roteirizar(){
    // place_id
    let markerArray = []
    console.log('roteiriar 3', this.props.waypoints);
    let me = this;
    // let origin = this.props.waypoints[0].formatted_address;
    // let destination = this.props.waypoints[this.props.waypoints.length-1].formatted_address;
    let origin = `${this.props.waypoints[0].location.lat()},${this.props.waypoints[0].location.lng()}`;
    let destination = `${this.props.waypoints[this.props.waypoints.length-1].location.lat()},${this.props.waypoints[this.props.waypoints.length-1].location.lng()}`;
    console.log('roteiriar 3 ficou origin ', origin, destination);
    let waypoints = [];
    if(this.props.waypoints.length > 2){
      for( var cont = 1; cont < this.props.waypoints.length-1; cont++){
        console.log('loop no que faltam ', this.props.waypoints[cont].location )
        waypoints.push({
          location: `${this.props.waypoints[cont].location.lat()},${this.props.waypoints[cont].location.lng()}`,
          stopover: true
        })
        // waypoints.push(`${this.props.waypoints[cont].location.lat()},${this.props.waypoints[cont].location.lng()}`)
      }
    }
    console.log("origin ficou -> ", origin);
    console.log("destination ficou -> ", destination)
    console.log("waypoint ficou -> ", waypoints)

    var request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
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
              let dataDurationDistance = directionsRenderer.directions.routes[0].legs.map((el,index)=> {
                  return {
                    distance:el.distance.value,
                    duration: el.duration.value
                  }
              })
              let totalDistance = 0;
              let totalDuration = 0;
              console.log('antes do lop ', dataDurationDistance)
              dataDurationDistance.map((el,idx)=>{
                console.log('loop el ', el)
                totalDistance += el.distance;
                totalDuration += el.duration;
              })
              let newDataDistanceDuration = { duration: totalDuration/60 , distance: totalDistance/1000}
              console.log('distancia ->',me.props , newDataDistanceDuration);
              me.props._setDuration(newDataDistanceDuration.duration);
              me.props._setDistance(newDataDistanceDuration.distance);
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
    // console.log('componentDidMount ', this.props)
    this.props._addInputAutocomplete('origemInput');
    // this.props._addWaypoint('waypoint1');
    this.props._addInputAutocomplete('waypoint1');
    // document.getElementById('origemInput').addEventListener('change', (e)=> console.log('oi ', e.target.value));
    // document.getElementById('destinoInput').addaddEventListenerEventListener('change',  (e)=> this.props._setDestination(e.target.value));
  }
  render(){
    let btDisabled = this.props.waypoints.length <= 1 ? true : false;
    console.log("FormSeach render - props -> ", this.props.waypoints);
    let inputsWaypoints = [];
    for (var cont = 2;  cont < this.props.idsInputAutoComplete.length; cont++){
      console.log('loop cont ',cont, this.props.idsInputAutoComplete[cont])
      inputsWaypoints.push(
        <Row key={cont}>
          <Col>
            {cont} -
            <Input
              placeholder="Onde mais?"
              id={ this.props.idsInputAutoComplete[cont]}
            />
          </Col>
        </Row>
      )
    }
    return (
      <div className='formRoute'>
        <Row>
            <Col>
              <p><b>Origem</b></p>
            </Col>
        </Row>
        <Row>
            <Col>
                <Input
                    defaultValue=""
                    placeholder="Coloque seu lugar de partida"
                    onChange={(e)=>{ this.props._setOrigin(e.target.value)}}
                    id={'origemInput'}
                />
            </Col>
        </Row>
        <Row>
            <Col><p><b>Paradas</b></p></Col>
        </Row>
        <Row>
            <Col>
                <Input
                    defaultValue=""
                    id={'waypoint1'}
                    placeholder="Onde deseja ir?"
                    onChangeCapture={()=>{console.log('onChangeCapture')}}
                    onChange={(e)=>{this.props._setDestination(e.target.value)}}
                />
                <Fab onClick={this.addInputWaypoint} size="small" color="secondary" aria-label="add" className={'classes.margin'}>
                    <AddIcon />
                </Fab>
                {inputsWaypoints}
            </Col>
        </Row>
        <Row>
          <Col className={'text-center'}>
          <ButtonToolbar>

            <Button 
              variant="contained" 
              color="primary" 
              className={'btSearch'} 
              onClick={()=> this.roteirizar()}
              disabled={btDisabled}
              >
                Roteirizar
            </Button>
          </ButtonToolbar>
            {/* <Button variant="success">Success</Button> */}
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
  idsInputAutoComplete: state.maps.idsInputAutoComplete,
})

const mapDistpacthToProps = dispatch => ({
   _setOrigin: origin => dispatch(setOrigin(origin)),
   _setDestination: destination => dispatch(setDestination(destination)),
   _addWaypoint : waypoint => dispatch(addWaypoint(waypoint)),
   _addInputAutocomplete: idInput => dispatch(addInputAutocomplete(idInput)),
   _setDuration: duration => dispatch(setDuration(duration)),
   _setDistance: distance => dispatch(setDistance(distance)),
});
export default connect(mapStateToProps,mapDistpacthToProps)(FormSeach);