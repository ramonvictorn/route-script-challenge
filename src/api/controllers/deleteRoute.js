/**
 * @file deleteRoute.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'delete route' feature
 * @module controllers/deleteRoute
 */
const deleteRouteService = require('../../services/deleteRoute.js');
module.exports = deleteRoute;
/**
 * @api {DELETE} /api/routes DeleteRoute
 * @apiName DeleteRoute
 * @apiGroup Route
 * @apiDescription This function receive the route id data and call service to delete this route
 * @apiparam {Object} req - The request
 * @apiparam {Object} req.body - The request body with the following params
 * @apiparam {string} req.body.id - The route id
 * @apiparam {Object} res - The response
 * @return {Object} The object with data or error
 */
async function deleteRoute(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        id: req.body.id,
    };
    let dataFromService = await deleteRouteService(context);
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
    if(params.id == undefined || params.id.length == 0) return false;
    return true;
}