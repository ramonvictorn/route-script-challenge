import React, { Component } from 'react';
import RouteMapContainer from '../containers/RouteMapContainer.jsx';
import SearchRouterContainer from '../containers/SearchRouterContainer.jsx';
import DirectionsServiceContainer from '../containers/DirectionsServiceContainer.jsx';
class RouterView extends Component {
    render() {
        return <React.Fragment>
            <div className={'viewRoute'}>
                <div className={'controlMap'}>
                    <SearchRouterContainer></SearchRouterContainer>
                    <DirectionsServiceContainer></DirectionsServiceContainer>
                </div>
                <RouteMapContainer></RouteMapContainer>
            </div>
        </React.Fragment>
    }
}
export default RouterView;