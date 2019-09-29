import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';
// material ui
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

class HeaderMenu extends Component {
    constructor(){
        super();
    }
    render(){
        return(
            <div className={'headerMenu'}>
                   <Link to={'/'}>Menu</Link>
                   <Link to={'/myroutes'}>Minhas rotas</Link>
            </div>
        )
    }
}
export default connect ()(HeaderMenu);