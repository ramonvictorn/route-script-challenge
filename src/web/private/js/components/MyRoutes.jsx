import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
    setMyRoutes,
    setWaypoints,
} from '../actions/map.js';
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
        console.log('see route - ', index);
        this.props._setWaypoints(this.props.myRoutes[index].waypoints);

    }
    render(){
        console.log('My routes props -> ',this.props)
        let myRoutes = this.props.myRoutes.map((el,index)=>{
            console.log("teste de index ", index)
            return (
                <li key={index}>{el.title} <button onClick={()=>{this.seeRoute(index)}}>Visualizar rota</button></li>
            )
        })
        return(
            <>
            ola my routes
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
})
export default connect(mapStateToProps,mapDispathToProps)(MyRoutes)