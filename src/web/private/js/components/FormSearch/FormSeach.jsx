import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import axios from 'axios';
import './FormSearch.css';
// action
import {
  addWaypoint,
  setDistance,
  setDuration,
  setModelEditRoute,
  setWaypoints,
  setRequestMapObject,
  removeWaypointByIndex,
  setPlaceWaypoint,
} from '../../actions/map.js';

class FormSeach extends Component {
  constructor(){
    super();
    this.roteirizar = this.roteirizar.bind(this);
    this.addInputWaypoint = this.addInputWaypoint.bind(this);
    this.resetRoutes = this.resetRoutes.bind(this);
    this.removeInputWaypoint = this.removeInputWaypoint.bind(this);
  }
  resetRoutes(){
    this.props._setModelEditRoute(true);
    this.props._setWaypoints([]);
  }
  addInputWaypoint(){
    let newId = `waypoint${this.props.waypoints.length}`;
    this.props._addWaypoint({
      index:this.props.waypoints.length,
      idInput:newId,
      place: {
        name:'',
      }
    })
  }
  removeInputWaypoint(idx){
    this.props._removeWaypointByIndex(idx);
  }
  roteirizar(){
    let markerArray = []
    let waypoints = [];
    let me = this;
    let origin = `${this.props.waypoints[0].place.location.lat},${this.props.waypoints[0].place.location.lng}`;
    let destination = `${this.props.waypoints[this.props.waypoints.length-1].place.location.lat},${this.props.waypoints[this.props.waypoints.length-1].place.location.lng}`;
    if(this.props.waypoints.length > 2){
      for( var cont = 1; cont < this.props.waypoints.length-1; cont++){
        waypoints.push({
          location: `${this.props.waypoints[cont].place.location.lat},${this.props.waypoints[cont].place.location.lng}`,
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
    this.props._setRequestMapObject(request);
  }
  componentDidMount(){
    if(this.props.waypoints.length != 2){
      this.props._addWaypoint({
        index:0,
        idInput:'origemInput',
        place: {
          name:''
        }
      })
      this.props._addWaypoint({
        index:1,
        idInput:'waypoint1',
        place: {
          name:''
        }
      })
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

    let btDisabled = this.props.waypoints.length <= 1 ||  this.props.waypoints[0] == null ? true : false;
    let inputsWaypoints = [];
    for (let cont = 2;  cont < this.props.waypoints.length; cont++){
      console.log("loop no form ", this.props.waypoints[cont]);
      inputsWaypoints.push(
        <Row key={cont}>
          <Col>
            {cont} -
            <Input
              placeholder="Onde mais?"
              onChange={(e)=>{this.props._setPlaceWaypoint({index:cont,place:e.target.value})}}
              value={this.props.waypoints[cont].place.name}
              id={ this.props.waypoints[cont].idInput}
            />
          <RemoveCircleIcon onClick={()=>this.removeInputWaypoint(cont)}/>
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
                    onChange={(e)=>{this.props._setPlaceWaypoint({index:0,place:e.target.value})}}
                    placeholder="Coloque seu lugar de partida"
                    id={'origemInput'}
                    value={this.props.waypoints[0] && this.props.waypoints[0].place ? this.props.waypoints[0].place.name : ''}
                />
            </Col>
        </Row>
        <Row>
            <Col><p><b>Paradas</b></p></Col>
        </Row>
        <Row>
            <Col>
                <Input
                    id={'waypoint1'}
                    onChange={(e)=>{this.props._setPlaceWaypoint({index:1,place:e.target.value})}}
                    placeholder="Onde deseja ir?"
                    value={this.props.waypoints[1] && this.props.waypoints[1].place ? this.props.waypoints[1].place.name : ''}
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
  waypoints: state.maps.waypoints,
  modeEditRoute: state.maps.modeEditRoute,
})

const mapDistpacthToProps = dispatch => ({
  _addWaypoint : waypoint => dispatch(addWaypoint(waypoint)),
  _setDuration: duration => dispatch(setDuration(duration)),
  _setDistance: distance => dispatch(setDistance(distance)),
  _setModelEditRoute: (value) => dispatch(setModelEditRoute(value)),
  _setWaypoints: (waypoints) => dispatch(setWaypoints(waypoints)),
  _setRequestMapObject: (object) => dispatch(setRequestMapObject(object)),
  _removeWaypointByIndex: (index) => dispatch(removeWaypointByIndex(index)),
  _setPlaceWaypoint: data => dispatch(setPlaceWaypoint(data)),
});
export default connect(mapStateToProps,mapDistpacthToProps)(FormSeach);