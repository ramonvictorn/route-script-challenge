const mongoose = require('mongoose');
const RouteSchema = require('./Schemas/RouteSchema.js');
const logger = require('../loaders/logger.js')
module.exports = addRoute;
async function addRoute(context){
    let Route = new RouteSchema({
        idUser : context.idUser,
        waypoints: context.waypoints,
        dateInserted : Date.now(),
    })

    return new Promise((resolve,reject)=>{
        Route.save()
        .then(doc => {
            logger.log('saved - >',doc);
            resolve({data:doc});
        })
        .catch(err => {
            logger.log('err-> ',err);
            reject({error:err});
        })
    })
}