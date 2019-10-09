/**
 * @file getMaps.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'get maps' feature
 * @module controllers/getMaps
 */
const getMapsService = require('../../services/getMapsApi.js');
module.exports = getMaps;

/**
 * @api {GET} /api/maps GetMaps
 * @apiName GetMaps
 * @apiGroup Maps
 * @apiDescription This function call the map service to get map
 * @apiparam {Object} req - The request 
 * @apiparam {Object} res - The response params
 * @return {Object} The object with data or error
 */
async function getMaps(req,res){
    let dataFromService = await getMapsService();
    res.status(dataFromService.code).send(dataFromService.data)
}