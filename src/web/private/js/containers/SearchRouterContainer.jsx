import React, {Component} from 'react';

import FormSearch from '../components/FormSeach.jsx';
class SearchRouterContainer extends Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div className={'searchContainer'}>
                <FormSearch></FormSearch>
            </div>
        )
    }
}
export default SearchRouterContainer;