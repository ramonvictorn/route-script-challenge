import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu.jsx';
import MyRoutes from '../../components/MyRoutes/MyRoutes.jsx';
class MyRoute extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <>
                <HeaderMenu/>
                <MyRoutes history={this.props.history}></MyRoutes>
            </>
        )
    }
}
export default connect()(MyRoute);