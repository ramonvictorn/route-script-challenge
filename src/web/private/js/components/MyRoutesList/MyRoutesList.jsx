import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './MyRoutesList.css';

let MyRoutesList = ({list,clickToSee,clickToDelete}) => {
    let routesList = list.map((el,index)=>{
        return (
            <ListGroup.Item 
                className="my-routes-list"
                key={index} 
                variant={ index % 2 == 0 ? "primary" : ""}
            >
                <VisibilityIcon onClick={()=>{clickToSee(index)}} className={'my-routes-icon-see'}/>
                <DeleteForeverIcon onClick={()=>{clickToDelete(index)}} className={'my-routes-icon-delete'}/>
                {el.title}
            </ListGroup.Item>
            )
    })
    return(
        <>
        <ListGroup>
            {routesList}
        </ListGroup>
        </>
    )
}
export default MyRoutesList;