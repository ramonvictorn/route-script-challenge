import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// actions
import {
    setOrigin,
    setDestination,
  } from '../actions/map.js';

class Maps extends Component {
    constructor(){
        super();
        this.initMaps = this.initMaps.bind(this);
    }
    
    fetchData(){
        axios("/api/maps/")
        .then((data)=>{
            // console.log('data do maps', data)
        })
    }
    initMaps(){
        var me = this;
        var positionStart = {lat: 27.6450835, lng:-48.71646750000002 };
        // let inputOrigem = document.getElementById(this.props.idInputOrigin);
        // let inputDestino = document.getElementById(this.props.idInputDestination);
        // configListenersAutoComplete()
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        // var autocompleteOrigem = new google.maps.places.Autocomplete(inputOrigem);
        // var autocompleteDestino = new google.maps.places.Autocomplete(destinoInput);
        
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 2, center: positionStart}
        );
            
        window.mapServices = {
            directionsService: directionsService,
            directionsRenderer: directionsRenderer,
            map: map,
        };
        // autocompleteDestino.addListener('place_changed', function() {
        //     var place = autocompleteDestino.getPlace();
        //     // console.log('listener no maps11', me.props._setDestination);
        //     me.props._setDestination(place);
        //     var marker = new google.maps.Marker({
        //         position: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()},
        //         map: map,
        //         title: place.name,
        //     });
        // });
        
        // autocompleteOrigem.addListener('place_changed', function() {
        //     var place = autocompleteOrigem.getPlace();
        //     me.props._setOrigin(place);
        //     var marker = new google.maps.Marker({
        //         position: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()},
        //         map: map,
        //         title: place.name,
        //     });
        // });
    }
        componentDidMount(){
            // this.fetchData();
            var script = document.createElement("script");  // create a script DOM node
            script.src = "/api/maps/";  // set its src to the provided URL
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => {
                console.log('Maps - script inserido!');
                this.initMaps();
            };
        }
    configListenersAutoComplete(arrayIdInputs){
        arrayIdInputs.map((el,idx)=>{
            let inputOrigem = document.getElementById(el);
            var autocompleteOrigem = new google.maps.places.Autocomplete(inputOrigem);

            autocompleteOrigem.addListener('place_changed', function() {
                var place = autocompleteOrigem.getPlace();
                me.props._setOrigin(place);
                var marker = new google.maps.Marker({
                    position: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()},
                    map: map,
                    title: place.name,
                });
            });
        })
    }
    render() {
        // console.log("maps render ", this.props)
        return <React.Fragment>
        <div id={'map'}></div>
        </React.Fragment>
    }
}

const mapStateToProps = state => ({
    origin : state.maps.origin,
    destination: state.maps.destination,
})

const mapDistpacthToProps = dispatch => ({
    _setOrigin: origin => dispatch(setOrigin(origin)),
    _setDestination: destination => dispatch(setDestination(destination)),
 });
    
export default connect(mapStateToProps,mapDistpacthToProps)(Maps);