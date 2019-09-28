import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
// action
import {
    setOrigin,
    setDestination,
  } from '../actions/map.js';
class Maps extends Component {
    constructor({idInputOrigin}){
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
        let inputOrigem = document.getElementById(this.props.idInputOrigin);
        let inputDestino = document.getElementById(this.props.idInputDestination);
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        var autocompleteOrigem = new google.maps.places.Autocomplete(inputOrigem);
        var autocompleteDestino = new google.maps.places.Autocomplete(destinoInput);
        
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 2, center: positionStart}
        );
            
        window.mapServices = {
            directionsService: directionsService,
            directionsRenderer: directionsRenderer,
            map: map,
        };
        autocompleteDestino.addListener('place_changed', function() {
            var place = autocompleteDestino.getPlace();
            // console.log('listener no maps11', me.props._setDestination);
            me.props._setDestination(place);
            var marker = new google.maps.Marker({
                position: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()},
                map: map,
                title: place.name,
            });
        });
        
        autocompleteOrigem.addListener('place_changed', function() {
            var place = autocompleteOrigem.getPlace();
            // console.log('listener no maps 2',  this.props._setOrigin);
            me.props._setOrigin(place);
            var marker = new google.maps.Marker({
                position: {lat:place.geometry.location.lat(), lng:place.geometry.location.lng()},
                map: map,
                title: place.name,
            });
            // var loc1 = new google.maps.LatLng(28.407222, 49.546110999999996);
            // var loc2 = new google.maps.LatLng(27.6474254, 48.66895060000002);
            // var request = {
            //     origin: 'chicago, il',
            //     destination: 'montreal, quebec',
            //     waypoints: [{location: 'los angeles, ca', stopover: true}],
            //     travelMode: 'DRIVING'
            // };

            // directionsService.route(request, function(result, status) {
            //     if (status == 'OK') {
            //         console.log("deu ok2", result)
            //         directionsRenderer.setDirections(result);
            //         directionsRenderer.setPanel(document.getElementById('routesDescription'));

            //         var control = document.getElementById('routesDescription');
            //         control.style.display = 'block';
            //         computeTotalDistance(result);
            //         function computeTotalDistance(result) {
            //             var total = 0;
            //             var myroute = result.routes[0];
            //             for (var i = 0; i < myroute.legs.length; i++) {
            //               total += myroute.legs[i].distance.value;
            //             }
            //             total = total / 1000;
            //             console.log('o total é ', tota)
            //             // document.getElementById('total').innerHTML = total + ' km';
            //           }
            //         // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
            //     }else{
            //         console.log("nao deu ok 2", status)
            //     }
            // });
        });
    }
        componentDidMount(){
            // this.fetchData();
            console.log("did")
            var script = document.createElement("script");  // create a script DOM node
            script.src = "/api/maps/";  // set its src to the provided URL
            script.async = true;
            document.head.appendChild(script);
            script.onload = () => {
                console.log('inseriu');
                this.initMaps();
            };
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