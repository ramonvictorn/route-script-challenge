import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderMenu from '../components/HeaderMenu.jsx';
import MyRoutes from '../components/MyRoutes.jsx';
class MyRoute extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <>
                <HeaderMenu/>
                <MyRoutes></MyRoutes>
            </>
        )
    }
}
export default connect()(MyRoute);