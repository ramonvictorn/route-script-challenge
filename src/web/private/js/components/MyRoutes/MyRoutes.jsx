import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import './MyRoutes.css';
import {
    setMyRoutes,
    setWaypoints,
    addInputAutocomplete,
    setModelEditRoute,
    setRequestMapObject,
} from '../../actions/map.js';
class MyRoutes extends Component{
    constructor(){
        super();
        this.fetchMyRoutes = this.fetchMyRoutes.bind(this);
        this.seeRoute = this.seeRoute.bind(this);
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
    seeRoute(index){
        this.props._setWaypoints(this.props.myRoutes[index].waypoints);
        this.props._setModelEditRoute(false);
        this.props.history.push('/routes');

        let markerArray = []
        let waypoints = [];
        let me = this;
        console.log("see route ", this.props.myRoutes[index].waypoints)
        let origin = `${this.props.myRoutes[index].waypoints[0].location.lat},${this.props.myRoutes[index].waypoints[0].location.lng}`;
        let destination = `${this.props.myRoutes[index].waypoints[this.props.myRoutes[index].waypoints.length-1].location.lat},${this.props.myRoutes[index].waypoints[this.props.myRoutes[index].waypoints.length-1].location.lng}`;
        if(this.props.myRoutes[index].waypoints.length > 2){
            for( var cont = 1; cont < this.props.myRoutes[index].waypoints.length-1; cont++){
                waypoints.push({
                location: `${this.props.myRoutes[index].waypoints[cont].location.lat},${this.props.myRoutes[index].waypoints[cont].location.lng}`,
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
        console.log("seeroute REQUEST OBJE ", request);
        this.props._setRequestMapObject(request);

    }
    render(){
        let myRoutes = this.props.myRoutes.map((el,index)=>{
            return (
                <ListGroup.Item 
                    className="my-routes-list"
                    key={index} 
                    variant={ index % 2 == 0 ? "primary" : ""}
                    onClick={()=>{this.seeRoute(index)}}
                >
                    {el.title}
                </ListGroup.Item>
                )
        })
        return(
            <>
            <ListGroup>
                {myRoutes}
            </ListGroup>
            </>
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
    _addInputAutocomplete: idInput => dispatch(addInputAutocomplete(idInput)),
    _setModelEditRoute: (value) => dispath(setModelEditRoute(value)),
    _setRequestMapObject: (object) => dispath(setRequestMapObject(object)),
})
export default connect(mapStateToProps,mapDispathToProps)(MyRoutes)