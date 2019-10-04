const axios = require('axios');
const GOOGLE_MAPS_API_KEY = require('../config/settings.js').GOOGLE_MAPS_API_KEY;
const logger= require('../loaders/logger.js');
module.exports = getMapsApi;
function getMapsApi(){
    return new Promise((resolve,reject)=>{
        axios.get(`https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&key=${GOOGLE_MAPS_API_KEY}&language=pt-br&&region=BR`)
            .then(dataRequest=>{ 
                resolve({data: dataRequest.data,code:200})
            })
            .catch(err => {
                logger.log('getMapsApis Error ', err);
                resolve({error:err,code:400})
            })

    })
}