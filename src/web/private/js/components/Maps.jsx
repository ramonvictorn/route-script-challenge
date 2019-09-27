import React, { Component } from 'react';
import axios from 'axios';

class Maps extends Component {
    constructor(){
        super();
    }
    
    fetchData(){
        axios("/api/maps/")
        .then((data)=>{
            console.log('data do maps', data)
        })
    }
    initMaps(){
        var positionStart = {lat: 27.6450835, lng:-48.71646750000002 };
        let inputOrigem = document.getElementById("origemInput");
        let inputDestino = document.getElementById("destinoInput");
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 4, center: positionStart}
        );
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer()
        directionsRenderer.setMap(map);
        // var marker = new google.maps.Marker({position: uluru, map: map});
        var autocompleteOrigem = new google.maps.places.Autocomplete(inputOrigem);
        var autocompleteDestino = new google.maps.places.Autocomplete(destinoInput);
        window.ramon = autocompleteDestino;
        
        
        autocompleteOrigem.addListener('place_changed', function() {
            var place = autocompleteOrigem.getPlace();
            console.log('listener', place);
            console.log("localização -> lat ", place.geometry.location.lat(),'lng ', place.geometry.location.lng(), 'id ', place.id)
            var myLatLng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
            });
            var loc1 = new google.maps.LatLng(28.407222, 49.546110999999996);
            var loc2 = new google.maps.LatLng(27.6474254, 48.66895060000002);
            var request = {
                origin: 'chicago, il',
                destination: 'montreal, quebec',
                waypoints: [{location: 'los angeles, ca', stopover: true}],
                travelMode: 'DRIVING'
            };

            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                    console.log("deu ok2", result)
                    directionsRenderer.setDirections(result);
                    directionsRenderer.setPanel(document.getElementById('testeinst'));

                    var control = document.getElementById('testeinst');
                    control.style.display = 'block';
                    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
                }else{
                    console.log("nao deu ok 2", status)
                }
            });
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
            return <React.Fragment>
            <div id={'map'}></div>
            </React.Fragment>
        }
    }
    
    export default Maps;