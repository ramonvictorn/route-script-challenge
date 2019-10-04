import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderMenu from '../components/HeaderMenu.jsx';
class MyRoute extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <>
                <HeaderMenu/>
                my route
            </>
        )
    }
}
export default connect()(MyRoute);