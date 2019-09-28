import React,{Component} from 'react';
import Maps from '../components/Maps.jsx';
class RouteMapContainer extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <div className={'mapContainer'}>
                <Maps
                    idInputOrigin={'origemInput'}
                    idInputDestination={'destinationInput'}
                >
                </Maps>
            </div>
        )
    }
}
export default RouteMapContainer