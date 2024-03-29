import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './MyRoutesList.css';

let MyRoutesList = ({list,clickToSee,clickToDelete}) => {
    if(list.length == 0){
        return (
            <p className={'warn-my-routes'}>Você não possui nenhuma rota salva ainda...</p>
        )
    }
    let routesList = list.map((el,index)=>{
        return (
            <ListGroup.Item 
                className="my-routes-list"
                key={index} 
                variant={ index % 2 == 0 ? "primary" : ""}
            >
                <VisibilityIcon onClick={()=>{clickToSee(index)}} className={'my-routes-icon-see'}/>
                <DeleteForeverIcon onClick={()=>{clickToDelete(el._id)}} className={'my-routes-icon-delete'}/>
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