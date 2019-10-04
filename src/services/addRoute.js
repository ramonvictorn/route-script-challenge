/**
 * @file addRoute.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'add route' services
 * @module services/addRoute
 */
const logger= require('../loaders/logger.js');
const addRouteModel = require('../models/addRoute.js');
module.exports = addRoutes;
/**
 * This function receive the route params and call model to save this route
 * @param {Object} context - The request body with the following params
 * @param {string} context.idUser - The id user
 * @param {Object[]} context.waypoints - The waypoints user
 * @param {string} context.name - The name of the route user
 * @return {Object} The object with data or error
 */
function addRoutes(context){
    return new Promise((resolve,reject)=>{
        addRouteModel(context)
            .then(data=>{ 
                resolve({data:data,code:200});
            })
            .catch(err => {
                logger.log('addRoute Error ', err);
                resolve({error:err,code:400})
            })

    })
}