/**
 * @file deleteRoute.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'delete route' services
 * @module services/deleteRoute
 */
const logger= require('../loaders/logger.js');
const routeModel = require('../models/route.js');
module.exports = deleteRoute;
/**
 * This function receive the id route params and call model to delete this route
 * @apiparam {Object} context - The request body with the following params
 * @apiparam {string} context.id - The route id
 * @return {Object} The object with data or error
 */
function deleteRoute(context){
    return new Promise((resolve,reject)=>{
        routeModel.deleteRoute(context)
            .then(data=>{ 
                resolve({data:data,code:200});
            })
            .catch(err => {
                logger.log('addRoute Error ', err);
                resolve({error:err,code:400})
            })

    })
}