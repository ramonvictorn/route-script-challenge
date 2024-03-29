const mongoose = require('mongoose');
const RouteSchema = require('./Schemas/RouteSchema.js');
const logger = require('../loaders/logger.js')
module.exports = {
    addRoute,
    getRoutesByUser,
    deleteRoute,
}
function addRoute(context){
    let Route = new RouteSchema({
        idUser : context.idUser,
        title: context.title,
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
            resolve({error:err});
        })
    })
}

function getRoutesByUser(context){
    let query = {
        idUser : context.idUser,
    }

    return new Promise((resolve,reject)=>{
        RouteSchema.find(query,)
            .then((docs)=>{
                resolve({data:docs});
            })
            .catch((err)=>{
                resolve({error:err})
            })
    })
}

function deleteRoute(context){
    let query = {
        _id: context.id,
    }
    return new Promise((resolve,reject)=>{
        RouteSchema.deleteOne(query,)
            .then((docs)=>{
                resolve({data:docs});
            })
            .catch((err)=>{
                resolve({error:err})
            })
    })
}