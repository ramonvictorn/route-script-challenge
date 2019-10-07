import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './Maps.css';
import {
    addWaypoint,
    setMapScriptInserted,
    setDuration,
    setDistance,
    setPlaceWaypoint,
  } from '../../actions/map.js';

class Maps extends Component {
    constructor(){
        super();
        this.initMaps = this.initMaps.bind(this);
        this.configListenersAutoComplete = this.configListenersAutoComplete.bind(this);
        this.calculateRoute = this.calculateRoute.bind(this);
    }

    initMaps(){
        var positionStart = {lat: -29.17768, lng:-51.2184097 };
        navigator.geolocation.getCurrentPosition(success,()=>{});
        function success(pos) {
            var crd = pos.coords;
            // console.log('Your current position is:');
            // console.log(`Latitude : ${crd.latitude}`);
            // console.log(`Longitude: ${crd.longitude}`);
            // console.log(`More or less ${crd.accuracy} meters.`);
            positionStart.lat = crd.latitude;
            positionStart.lng = crd.longitude;
        };

        var me = this;
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 6, center: positionStart}
        );
        var marker = new google.maps.Marker({
            position: positionStart,
            map: map
        });
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        this.configListenersAutoComplete();
        window.mapServices = {
            google : google,
            directionsService: directionsService,
            directionsRenderer: directionsRenderer,
            map: map,
        };
    }
    calculateRoute(){
        if(this.props.requestMapObject == null){
            return;
        }
        let request = this.props.requestMapObject;
        let me = this;
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
        if(this.props.scriptMapInserted){
            this.initMaps();
            return;
        }
        var script = document.createElement("script");  
        script.src = "/api/maps/"; 
        script.async = true;
        document.head.appendChild(script);
        script.onload = () => {
            this.props._setMapScriptInserted(true);
            this.initMaps();
        };
    }
    componentDidUpdate(){
        if(this.props.scriptMapInserted && this.props.modeEditRoute ){
            this.configListenersAutoComplete();
        }
    }
    configListenersAutoComplete(){
        if(!this.props.modeEditRoute){
            return;
        }
        let me = this;
        this.props.waypoints.map((el,idx)=>{
            let inputOrigem = document.getElementById(el.idInput);
            var autocompleteOrigem = new google.maps.places.Autocomplete(inputOrigem);

            autocompleteOrigem.addListener('place_changed', function() {
                var place = autocompleteOrigem.getPlace();
                me.props._setPlaceWaypoint({
                    index:idx,
                    place: {
                        name: place.formatted_address,
                        placeId: place.place_id,
                        location:{
                            lat:place.geometry.location.lat(),
                            lng:place.geometry.location.lng(),
                            place: place.placeId,
                        }
                    }
                })
                var marker = new google.maps.Marker({
                    position: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()},
                    map:  window.mapServices.map,
                    title: place.name,
                });
            });
        })
    }
    render() {
        this.calculateRoute();
        return <>
            <div id={'map'}></div>
        </>
    }
}

const mapStateToProps = state => ({
    origin : state.maps.origin,
    destination: state.maps.destination,
    scriptMapInserted: state.maps.scriptMapInserted,
    modeEditRoute: state.maps.modeEditRoute,
    requestMapObject: state.maps.requestMapObject,
    waypoints: state.maps.waypoints,
})

const mapDistpacthToProps = dispatch => ({
    _addWaypoint :data => dispatch(addWaypoint(data)),
    _setMapScriptInserted: value => dispatch(setMapScriptInserted(value)),
    _setDuration: duration => dispatch(setDuration(duration)),
    _setDistance: distance => dispatch(setDistance(distance)),
    _setPlaceWaypoint: data => dispatch(setPlaceWaypoint(data)),
 });
    
export default connect(mapStateToProps,mapDistpacthToProps)(Maps);