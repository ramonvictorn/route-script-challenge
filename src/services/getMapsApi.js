const axios = require('axios');
const GOOGLE_MAPS_API_KEY = require('../config/settings.js').GOOGLE_MAPS_API_KEY;
const logger= require('../loaders/logger.js');
module.exports = getMapsApi;
function getMapsApi(){
    return new Promise((resolve,reject)=>{
        axios.get(`https://maps.googleapis.com/maps/api/js?libraries=places&sensor=false&key=${GOOGLE_MAPS_API_KEY}&language=pt-br&&region=BR`)
            .then(data=>{ 
                data.js
                resolve(data.data)
            })
            .catch(err => {
                logger.log('getMapsApis Error ', err);
                resolve('erro' , err)
            })

    })
}