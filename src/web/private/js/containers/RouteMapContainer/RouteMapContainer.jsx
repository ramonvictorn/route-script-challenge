import React,{Component} from 'react';
import Maps from '../../components/Maps/Maps.jsx';
import './RouteMapContainer.css'
class RouteMapContainer extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div className={'map-container'}>
                <Maps>
                </Maps>
            </div>
        )
    }
}
export default RouteMapContainer