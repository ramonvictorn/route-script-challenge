/**
 * @file getRoutesByUser.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'get routes by id user' feature
 * @module controllers/getRoutesByUser
 */
const getRoutesByUserService = require('../../services/getRoutesByUser.js');
module.exports = getRoutesByUser;
/**
 * This function receive the id user and call service to get your routes
 *
 * @param {Object} req - The request
 * @param {Object} req.body - The request body with the following params
 * @param {string} req.body.idUser - The id user
 * @param {Object} res - The response
 * @return {Object} The object with data or error
 */
async function getRoutesByUser(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        idUser: req.user.idUser,
    };
    let dataFromService = await getRoutesByUserService(context);
    res.status(dataFromService.code).send(dataFromService.data)
}

/**
 * This function receive the user data and return true if are corrects or false if not
 * @param {Object} params - The object with the params
 * @param {Object[]} params.waypoints - The waypoints user
 * @param {string} params.title - The name of the route user
 * @return {boolean} True if correct or false if not
 */
function verifyParams(params){
    // if(params.title == undefined || params.title.length == 0) return false;
    return true;
}