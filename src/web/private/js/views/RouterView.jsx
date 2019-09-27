import React, { Component } from 'react';
import RouteMapContainer from '../containers/RouteMapContainer.jsx';
import SearchRouterContainer from '../containers/SearchRouterContainer.jsx';
class RouterView extends Component {
    render() {
        return <React.Fragment>
            <div className={'viewRoute'}>
                <SearchRouterContainer></SearchRouterContainer>
                <RouteMapContainer></RouteMapContainer>
            </div>
        </React.Fragment>
    }
}
export default RouterView;