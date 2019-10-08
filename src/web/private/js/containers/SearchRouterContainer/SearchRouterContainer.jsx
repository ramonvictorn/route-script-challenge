import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormSearch from '../../components/FormSearch/FormSeach.jsx';
import './SearchRouterContainer.css';
import axios from 'axios';
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

class SearchRouterContainer extends Component{
    constructor(){
        super();
        this.routePath = this.routePath.bind(this);
        this.resetRoutePath = this.resetRoutePath.bind(this);
        this.addInputsWaypoints = this.addInputsWaypoints.bind(this);
        this.removeInputWaypoint = this.removeInputWaypoint.bind(this);
    }
    routePath(){
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
    resetRoutePath(){
        this.props._setModelEditRoute(true);
        this.props._setRequestMapObject(null);
        this.props._setDistance(null);
        this.props._setDuration(null);
        let waypointsReseteds = [
            {
                index:0,
                idInput:"origemInput",
                name:{place:" "},
            },
            {
                index:1,
                idInput:"waypoint1",
                name:{place:" "},
            }
        ]
        this.props._setWaypoints(waypointsReseteds);
    }
    addInputsWaypoints(){
        let newId = `waypoint${this.props.waypoints.length}`;
        this.props._addWaypoint({
            index:this.props.waypoints.length,
            idInput:newId,
            place: {
                name:' ',
            }
        })
    }
    removeInputWaypoint(index){
        this.props._removeWaypointByIndex(index);
    }
    render(){
        return (
            <div className={'search-container'}>
                <FormSearch
                    routePathOnClick={this.routePath}
                    resetRoutePathOnClick={this.resetRoutePath}
                    addInputsWaypointsOnClick={this.addInputsWaypoints}
                    removeInputsWaypointsOnClick={this.removeInputWaypoint}
                ></FormSearch>
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
export default connect(mapStateToProps,mapDistpacthToProps)(SearchRouterContainer);