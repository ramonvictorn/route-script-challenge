/**
 * @file addRoute.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'add route' services
 * @module services/addRoute
 */
const logger= require('../loaders/logger.js');
const routeModel = require('../models/route.js');
module.exports = addRoutes;
/**
 * This function receive the route params and call model to save this route
 * @apiparam {Object} context - The request body with the following params
 * @apiparam {string} context.idUser - The id user
 * @apiparam {Object[]} context.waypoints - The waypoints user
 * @apiparam {string} context.title - The title of the route user
 * @return {Object} The object with data or error
 */
function addRoutes(context){
    return new Promise((resolve,reject)=>{
        routeModel.addRoute(context)
            .then(data=>{ 
                resolve({data:data,code:200});
            })
            .catch(err => {
                logger.log('addRoute Error ', err);
                resolve({error:err,code:400})
            })

    })
}