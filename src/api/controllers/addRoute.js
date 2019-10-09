/**
 * @file addRoute.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'add route' feature
 * @module controllers/addRoute
 */
const addRouteService = require('../../services/addRoute.js');
module.exports = addRoute;
/**
 * @api {POST} /api/routes AddRoute
 * @apiName AddRoute
 * @apiGroup Route
 * @apiDescription This function receive the route user data and call service to save this route
 * @apiparam {Object} req - The request
 * @apiparam {Object} req.body - The request body with the following params
 * @apiparam {string} req.body.idUser - The id user
 * @apiparam {Object[]} req.body.waypoints - The waypoints user
 * @apiparam {string} req.body.name - The name of the route user
 * @apiparam {Object} res - The response
 * @return {Object} The object with data or error
 */
async function addRoute(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        idUser: req.user.idUser,
        waypoints: req.body.waypoints,
        title:req.body.title,
    };
    let dataFromService = await addRouteService(context);
    res.status(dataFromService.code).send(dataFromService.data)
}

/**
 * This function receive the user data and return true if are corrects or false if not
 * @apiparam {Object} params - The object with the params
 * @apiparam {Object[]} params.waypoints - The waypoints user
 * @apiparam {string} params.title - The name of the route user
 * @return {boolean} True if correct or false if not
 */
function verifyParams(params){
    if(params.title == undefined || params.title.length == 0) return false;
    if(params.waypoints == undefined || params.waypoints.length == 0 ) return false;
    return true;
}