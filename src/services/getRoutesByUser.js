/**
 * @file getRoutesByUser.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'get route by user' service
 * @module services/getRoutesByUser
 */
const logger= require('../loaders/logger.js');
const routeModel = require('../models/route.js');
module.exports = getRoutesByUser;
/**
 * This function receive the idUser params and return your routes
 * @param {Object} context - The request body with the following params
 * @param {string} context.idUser - The id user
 * @return {Object} The object with data or error
 */
function getRoutesByUser(context){
    return new Promise((resolve,reject)=>{
        routeModel.getRoutesByUser(context)
            .then(data=>{ 
                resolve({data:data,code:200});
            })
            .catch(err => {
                logger.log('addRoute Error ', err);
                resolve({error:err,code:400})
            })

    })
}