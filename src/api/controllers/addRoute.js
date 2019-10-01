const addRouteService = require('../../services/addRoute.js');
const validadeRoute = require('../../loaders/validadeRoute.js');
module.exports = addRoute;
async function addRoute(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        idUser: req.body.idUser,
        waypoints: req.body.waypoints,
    };
    let dataReturned = await addRouteService(context);
    console.log('depois do await');
    res.send(dataReturned);
}
function verifyParams(params){
    // if(params.idUser == undefined || params.idUser.length == 0) return false;
    if(params.waypoints == undefined || params.waypoints.length == 0 ) return false;
    return true;
}