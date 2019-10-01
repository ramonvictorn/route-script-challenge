import React, {Component} from 'react';
import {connect} from 'react-redux';
class MyRoute extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <>
                my route
            </>
        )
    }
}
export default connect()(MyRoute);