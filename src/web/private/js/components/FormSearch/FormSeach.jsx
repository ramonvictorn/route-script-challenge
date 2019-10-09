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
import Chip from '@material-ui/core/Chip';
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
    this.verifyIsDisable = this.verifyIsDisable.bind(this);
    this.verifyIfNeedWarn = this.verifyIfNeedWarn.bind(this);
  }
  verifyIsDisable(){
    if(this.props.waypoints.length <= 1) return true;
    if(this.props.waypoints[0] == undefined ) return true;
    if(this.props.waypoints[0].place != undefined && this.props.waypoints[0].place.location == undefined) return true;
    if(this.props.waypoints[1] == undefined ) return true;
    if(this.props.waypoints[1].place != undefined && this.props.waypoints[1].place.location == undefined)  return true;
    return false;
  }
  verifyIfNeedWarn(indexWaypoint){
    if(this.props.waypoints[indexWaypoint] != undefined && (this.props.waypoints[indexWaypoint].place != undefined && this.props.waypoints[indexWaypoint].place.location == undefined)){
      if(this.props.waypoints[indexWaypoint].place.length > 0){
        return true;
      }
    }
    return false;
  }
  componentDidMount(){
    if(this.props.waypoints.length == 0){
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
    let Warn = [];
    this.props.waypoints.map((el,index)=>{
      if(this.verifyIfNeedWarn(index)){
        Warn[index] =
          <Chip color="secondary" label="Selecione uma opção para roteirizar" />
      }
    })
    let btDisabled = this.verifyIsDisable();
    let editForm =     
       ( 
        <>
        <Row>
          <Col className={'text-center'}>
          <ButtonToolbar>
            {this.props.modeEditRoute
            ? <Button 
                variant="contained" 
                color="primary" 
                className={'button-search'} 
                onClick={()=> this.props.routePathOnClick()}
                disabled={btDisabled}
              >
                Roteirizar
              </Button>
            : ''}
              <Button 
                variant="contained" 
                color="primary" 
                className={'button-search'} 
                onClick={()=> {this.props.resetRoutePathOnClick()}}
                disabled={btDisabled}
              >
                Cancelar
              </Button>
              {!this.props.modeEditRoute 
                ? <Button variant="contained" color="secondary" className={'button-new-route'} onClick={this.props.resetRoutePathOnClick}>
                    Montar nova rota
                  </Button>
                :''
              }
          </ButtonToolbar>
          </Col>
        </Row>
        </>
      )
  

    let inputsWaypoints = [];
    for (let cont = 2;  cont < this.props.waypoints.length; cont++){
      this.verifyIfNeedWarn(cont);
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
          <RemoveCircleIcon onClick={()=>this.props.removeInputsWaypointsOnClick(cont)}/>
          {Warn[cont] != undefined ? Warn[cont] : ''}
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
                {Warn[0] != undefined ? Warn[0] : ''}
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
                <Fab onClick={this.props.addInputsWaypointsOnClick} size="small" color="secondary" aria-label="add" className={'classes.margin'}>
                    <AddIcon />
                </Fab>
                {Warn[1] != undefined ? Warn[1] : ''}
                {inputsWaypoints}
            </Col>
        </Row>
        {editForm}
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