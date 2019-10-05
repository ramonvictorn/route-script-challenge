import React, {Component} from 'react';
import {connect} from 'react-redux';
import FormSearch from '../../components/FormSearch/FormSeach.jsx';
import './SearchRouterContainer.css'
class SearchRouterContainer extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className={'search-container'}>
                <FormSearch></FormSearch>
            </div>
        )
    }
}
export default connect()(SearchRouterContainer);