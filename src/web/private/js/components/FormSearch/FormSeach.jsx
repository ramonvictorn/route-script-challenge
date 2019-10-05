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
import './FormSearch.css';
// action
import {
  setOrigin,
  setDestination,
  addWaypoint,
  addInputAutocomplete,
  setDistance,
  setDuration,
  setModelEditRoute,
  setWaypoints,
} from '../../actions/map.js';

class FormSeach extends Component {
  constructor(){
    super();
    this.roteirizar = this.roteirizar.bind(this);
    this.addInputWaypoint = this.addInputWaypoint.bind(this);
    this.resetRoutes = this.resetRoutes.bind(this);
  }
  resetRoutes(){
    console.log('resetRoutes');
    this.props._setModelEditRoute(true);
    this.props._setWaypoints([]);
  }
  addInputWaypoint(){
    let newId = `waypoint${this.props.idsInputAutoComplete.length}`;
    this.props._addInputAutocomplete(newId);
  }
  roteirizar(){
    let markerArray = []
    let waypoints = [];
    let me = this;
    let origin = `${this.props.waypoints[0].location.lat},${this.props.waypoints[0].location.lng}`;
    let destination = `${this.props.waypoints[this.props.waypoints.length-1].location.lat},${this.props.waypoints[this.props.waypoints.length-1].location.lng}`;
    if(this.props.waypoints.length > 2){
      for( var cont = 1; cont < this.props.waypoints.length-1; cont++){
        waypoints.push({
          location: `${this.props.waypoints[cont].location.lat},${this.props.waypoints[cont].location.lng}`,
          stopover: true
        })
      }
    }

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
              directionsRenderer.setDirections(response);
              directionsRenderer.setMap(window.mapServices.map);
              directionsRenderer.setPanel(document.getElementById('routes-description'));
              let dataDurationDistance = directionsRenderer.directions.routes[0].legs.map((el,index)=> {
                  return {
                    distance:el.distance.value,
                    duration: el.duration.value
                  }
              })
              let totalDistance = 0;
              let totalDuration = 0;
              dataDurationDistance.map((el,idx)=>{
                totalDistance += el.distance;
                totalDuration += el.duration;
              })
              let newDataDistanceDuration = { duration: totalDuration/60 , distance: totalDistance/1000}
              me.props._setDuration(newDataDistanceDuration.duration);
              me.props._setDistance(newDataDistanceDuration.distance);
              var control = document.getElementById('routes-description');
              control.style.display = 'block';
            } else {
              console.log('Directions request failed due to ' + status);
            }
          });
    }
  }
  componentDidMount(){
    if(this.props.idsInputAutoComplete.length != 2){
      this.props._addInputAutocomplete('origemInput');
      this.props._addInputAutocomplete('waypoint1');
    }
  }
  render(){
    if(!this.props.modeEditRoute){
      return (
        <>
        <Row>
          <Col className={'text-center'}>
          <ButtonToolbar>
            <Button 
              variant="contained" 
              color="primary" 
              className={'button-search'} 
              onClick={()=> this.roteirizar()}
              disabled={btDisabled}
            >
              Roteirizar
            </Button>
            <Button variant="contained" color="secondary" className={'button-new-route'} onClick={this.resetRoutes}>
              Montar nova rota
            </Button>
          </ButtonToolbar>
          </Col>
        </Row>
        </>
      )
    }

    let btDisabled = this.props.waypoints.length <= 1 ? true : false;
    let inputsWaypoints = [];
    for (var cont = 2;  cont < this.props.idsInputAutoComplete.length; cont++){
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
      <div className='form-route'>
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
              className={'button-search'} 
              onClick={()=> this.roteirizar()}
              disabled={btDisabled}
              >
                Roteirizar
              </Button>
              <Button 
              variant="contained" 
              color="primary" 
              className={'button-search'} 
              onClick={()=> {console.log('resetttt')}}
              disabled={btDisabled}
              >
                Cancelar
              </Button>
          </ButtonToolbar>
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
  modeEditRoute: state.maps.modeEditRoute,
})

const mapDistpacthToProps = dispatch => ({
  _setOrigin: origin => dispatch(setOrigin(origin)),
  _setDestination: destination => dispatch(setDestination(destination)),
  _addWaypoint : waypoint => dispatch(addWaypoint(waypoint)),
  _addInputAutocomplete: idInput => dispatch(addInputAutocomplete(idInput)),
  _setDuration: duration => dispatch(setDuration(duration)),
  _setDistance: distance => dispatch(setDistance(distance)),
  _setModelEditRoute: (value) => dispatch(setModelEditRoute(value)),
  _setWaypoints: (waypoints) => dispatch(setWaypoints(waypoints)),
});
export default connect(mapStateToProps,mapDistpacthToProps)(FormSeach);