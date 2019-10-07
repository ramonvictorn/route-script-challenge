import React, {Component} from 'react';
import {connect} from 'react-redux';
import HeaderMenu from '../../components/HeaderMenu/HeaderMenu.jsx';
import MyRoutesContainer from '../../containers/MyRoutesContainer/MyRoutesContainer.jsx';
class MyRoute extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <>
                <HeaderMenu/>
                <MyRoutesContainer history={this.props.history}/>
            </>
        )
    }
}
export default connect()(MyRoute);