import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './Maps.css';
// actions
import {
    setOrigin,
    setDestination,
    addWaypoint,
    setMapScriptInserted,
  } from '../../actions/map.js';

class Maps extends Component {
    constructor(){
        super();
        this.initMaps = this.initMaps.bind(this);
        this.configListenersAutoComplete = this.configListenersAutoComplete.bind(this);
    }

    initMaps(){
        var positionStart = {lat: -29.17768, lng:-51.2184097 };
        navigator.geolocation.getCurrentPosition(success,()=>{console.log('eeo entao')});
        function success(pos) {
            var crd = pos.coords;
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            positionStart.lat = crd.latitude;
            positionStart.lng = crd.longitude;
        };
        console.log("ja passei do sucess")
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
            console.log('Maps - script inserido!');
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
        this.props.idsInputAutoComplete.map((el,idx)=>{
            let inputOrigem = document.getElementById(el);
            var autocompleteOrigem = new google.maps.places.Autocomplete(inputOrigem);

            autocompleteOrigem.addListener('place_changed', function() {
                var place = autocompleteOrigem.getPlace();
                me.props._addWaypoint({
                    idx:idx,
                    place: {
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
        return <>
            <div id={'map'}></div>
        </>
    }
}

const mapStateToProps = state => ({
    origin : state.maps.origin,
    destination: state.maps.destination,
    idsInputAutoComplete: state.maps.idsInputAutoComplete,
    scriptMapInserted: state.maps.scriptMapInserted,
    modeEditRoute: state.maps.modeEditRoute,
})

const mapDistpacthToProps = dispatch => ({
    _setOrigin: origin => dispatch(setOrigin(origin)),
    _setDestination: destination => dispatch(setDestination(destination)),
    _addWaypoint :data => dispatch(addWaypoint(data)),
    _setMapScriptInserted: value => dispatch(setMapScriptInserted(value)),
 });
    
export default connect(mapStateToProps,mapDistpacthToProps)(Maps);