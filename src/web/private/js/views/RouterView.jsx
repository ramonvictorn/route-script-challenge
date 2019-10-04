import React, { Component } from 'react';
import RouteMapContainer from '../containers/RouteMapContainer.jsx';
import SearchRouterContainer from '../containers/SearchRouterContainer.jsx';
import DirectionsServiceContainer from '../containers/DirectionsServiceContainer.jsx';
import HeaderMenu from '../components/HeaderMenu.jsx';
class RouterView extends Component {
    render() {
        return <React.Fragment>
            <HeaderMenu></HeaderMenu>
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