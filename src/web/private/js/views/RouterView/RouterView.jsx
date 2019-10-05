import React, { Component } from 'react';
import RouteMapContainer from '../../containers/RouteMapContainer/RouteMapContainer.jsx';
import SearchRouterContainer from '../../containers/SearchRouterContainer/SearchRouterContainer.jsx';
import DirectionsServiceContainer from '../../containers/DirectionsServiceContainer/DirectionsServiceContainer.jsx';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu.jsx';
import './RouterView.css';
class RouterView extends Component {
    render() {
        return <React.Fragment>
            <HeaderMenu></HeaderMenu>
            <div className={'view-route'}>
                <div className={'control-map'}>
                    <SearchRouterContainer></SearchRouterContainer>
                    <DirectionsServiceContainer></DirectionsServiceContainer>
                </div>
                <RouteMapContainer></RouteMapContainer>
            </div>
        </React.Fragment>
    }
}
export default RouterView;