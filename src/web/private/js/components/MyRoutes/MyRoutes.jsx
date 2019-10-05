import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './MyRoutes.css';
import {
    setMyRoutes,
    setWaypoints,
    addInputAutocomplete,
    setModelEditRoute,
} from '../../actions/map.js';
class MyRoutes extends Component{
    constructor(){
        super();
        this.fetchMyRoutes = this.fetchMyRoutes.bind(this);
        this.seeRoute = this.seeRoute.bind(this);
    }
    fetchMyRoutes(){
        console.log('fetchMyRoutes')
        axios.get('/api/user/routes')
            .then((dataFromApi)=>{
                console.log(' fetchMyRoutes data', dataFromApi.data);
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

    }
    render(){
        let myRoutes = this.props.myRoutes.map((el,index)=>{
            return (
                <li key={index}>{el.title} <button onClick={()=>{this.seeRoute(index)}}>Visualizar rota</button></li>
            )
        })
        return(
            <>
            <ul>
                {myRoutes}
            </ul>
            </>
        )
    }
}
const mapStateToProps = state =>({
    myRoutes : state.maps.myRoutes,
})

const mapDispathToProps = dispath => ({
    _setMyRoutes : (routes) => dispath(setMyRoutes(routes)),
    _setWaypoints: (data) => dispath(setWaypoints(data)),
    _addInputAutocomplete: idInput => dispatch(addInputAutocomplete(idInput)),
    _setModelEditRoute: (value) => dispath(setModelEditRoute(value)),
})
export default connect(mapStateToProps,mapDispathToProps)(MyRoutes)