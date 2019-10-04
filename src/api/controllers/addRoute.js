/**
 * @file addRoute.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'add route' feature
 * @module controllers/addRoute
 */
const addRouteService = require('../../services/addRoute.js');
module.exports = addRoute;
/**
 * This function receive the route user data and call service to save this route
 *
 * @param {Object} req - The request
 * @param {Object} req.body - The request body with the following params
 * @param {string} req.body.idUser - The id user
 * @param {Object[]} req.body.waypoints - The waypoints user
 * @param {string} req.body.name - The name of the route user
 * @param {Object} res - The response
 * @return {Object} The object with data or error
 */
async function addRoute(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        idUser: req.body.idUser,
        waypoints: req.body.waypoints,
        name:req.body.name,
    };
    let dataFromService = await addRouteService(context);
    res.status(dataFromService.code).send(dataFromService.data)
}

/**
 * This function receive the user data and return true if are corrects or false if not
 * @param {Object} params - The object with the params
 * @param {Object[]} params.waypoints - The waypoints user
 * @param {string} params.name - The name of the route user
 * @return {boolean} True if correct or false if not
 */
function verifyParams(params){
    if(params.name == undefined || params.name.length == 0) return false;
    if(params.waypoints == undefined || params.waypoints.length == 0 ) return false;
    return true;
}