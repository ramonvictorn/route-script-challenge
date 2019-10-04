/**
 * @file getMaps.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'get maps' feature
 * @module controllers/getMaps
 */
const getMapsService = require('../../services/getMapsApi.js');
module.exports = getMaps;

/**
 *  This function call the map service to get map
 *
 * @param {Object} req - The request 
 * @param {Object} req.body - The request body with the following params
 * @param {Object} res - The response params
 * @return {Object} The object with data or error
 */
async function getMaps(req,res){
    let dataFromService = await getMapsService();
    res.status(dataFromService.code).send(dataFromService.data)
}