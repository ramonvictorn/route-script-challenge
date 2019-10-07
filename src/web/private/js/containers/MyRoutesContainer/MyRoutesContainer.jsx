import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import MyRoutesList from '../../components/MyRoutesList/MyRoutesList.jsx';
import {
    setMyRoutes,
    setWaypoints,
    setModelEditRoute,
    setRequestMapObject,
} from '../../actions/map.js';

class MyRoutesContainer extends Component {
    constructor(){
        super();
        this.fetchMyRoutes = this.fetchMyRoutes.bind(this);
        this.seeRoute = this.seeRoute.bind(this);
        this.deleteRoute = this.deleteRoute.bind(this);
    }
    fetchMyRoutes(){
        axios.get('/api/user/routes')
            .then((dataFromApi)=>{
                this.props._setMyRoutes(dataFromApi.data.data);
            });
    }
    componentDidMount(){
        this.fetchMyRoutes();
    }

    deleteRoute(index){
        console.log('deleteRoute... ', index)
    }
    seeRoute(index){
        let markerArray = []
        let waypoints = [];
        let me = this;
        let origin = `${this.props.myRoutes[index].waypoints[0].place.location.lat},${this.props.myRoutes[index].waypoints[0].place.location.lng}`;
        let destination = `${this.props.myRoutes[index].waypoints[this.props.myRoutes[index].waypoints.length-1].place.location.lat},${this.props.myRoutes[index].waypoints[this.props.myRoutes[index].waypoints.length-1].place.location.lng}`;
        if(this.props.myRoutes[index].waypoints.length > 2){
            for( var cont = 1; cont < this.props.myRoutes[index].waypoints.length-1; cont++){
                waypoints.push(
                    {
                        location: `${this.props.myRoutes[index].waypoints[cont].place.location.lat},${this.props.myRoutes[index].waypoints[cont].place.location.lng}`,
                        stopover: true
                    }
                    )
                }
            }
            var request = {
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                travelMode: 'DRIVING'
            };
            this.props._setRequestMapObject(request);
            this.props._setWaypoints(this.props.myRoutes[index].waypoints);
            this.props._setModelEditRoute(false);
            this.props.history.push('/routes');

    }
    render(){
        return (
                <MyRoutesList
                    list={this.props.myRoutes}
                    clickToSee={(idx)=>{this.seeRoute(idx)}}
                    clickToDelete={(idx)=>{this.deleteRoute(idx)}}
                />
        )
    }
}

const mapStateToProps = state =>({
    myRoutes : state.maps.myRoutes,
    waypoints: state.maps.waypoints,
})

const mapDispathToProps = dispath => ({
    _setMyRoutes : (routes) => dispath(setMyRoutes(routes)),
    _setWaypoints: (data) => dispath(setWaypoints(data)),
    _setModelEditRoute: (value) => dispath(setModelEditRoute(value)),
    _setRequestMapObject: (object) => dispath(setRequestMapObject(object)),
})
export default connect(mapStateToProps,mapDispathToProps)(MyRoutesContainer);