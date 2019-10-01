import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// actions
import {
    setOrigin,
    setDestination,
    addWaypoint,
  } from '../actions/map.js';

class Maps extends Component {
    constructor(){
        super();
        this.state = {
            mapScript : false,
        }
        this.initMaps = this.initMaps.bind(this);
        this.configListenersAutoComplete = this.configListenersAutoComplete.bind(this);
    }
    
    fetchData(){
        axios("/api/maps/")
        .then((data)=>{
            // console.log('data do maps', this)
            // this.state({mapScript:true})
        })
    }
    initMaps(){
        var me = this;
        var positionStart = {lat: 27.6450835, lng:-48.71646750000002 };
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 2, center: positionStart}
        );
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
            this.setState({mapScript:true})
            this.initMaps();
        };
    }
    componentDidUpdate(){
        console.log("componentDidUpdate ", this.state)
        if(this.state.mapScript){
            console.log("deu true")
            this.configListenersAutoComplete();
        }
    }
    configListenersAutoComplete(){
        let me = this;
        console.log('configListenersAutoComplete ->', this.props.idsInputAutoComplete)
        this.props.idsInputAutoComplete.map((el,idx)=>{
            let inputOrigem = document.getElementById(el);
            console.log('loop ', idx, 'el -> ', el)
            var autocompleteOrigem = new google.maps.places.Autocomplete(inputOrigem);

            autocompleteOrigem.addListener('place_changed', function() {
                var place = autocompleteOrigem.getPlace();
                // me.props._setOrigin(place);
                // me.props._addWaypoint({idx,place});
                me.props._addWaypoint({idx,place: {placeId: place.place_id,location:place.geometry.location}})
                var marker = new google.maps.Marker({
                    position: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()},
                    map:  window.mapServices.map,
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
    idsInputAutoComplete: state.maps.idsInputAutoComplete,
})

const mapDistpacthToProps = dispatch => ({
    _setOrigin: origin => dispatch(setOrigin(origin)),
    _setDestination: destination => dispatch(setDestination(destination)),
    _addWaypoint :data => dispatch(addWaypoint(data)),
 });
    
export default connect(mapStateToProps,mapDistpacthToProps)(Maps);