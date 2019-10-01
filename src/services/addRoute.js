const logger= require('../loaders/logger.js');
const addRouteModel = require('../models/addRoute.js');
module.exports = addRoutes;
function addRoutes(context){
    return new Promise((resolve,reject)=>{
        addRouteModel(context)
            .then(data=>{ 
                resolve(data);
            })
            .catch(err => {
                logger.log('addRoute Error ', err);
                resolve('erro' , err)
            })

    })
}