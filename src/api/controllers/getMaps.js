const getMapsService = require('../../services/getMapsApi.js');
async function getMaps(req,res){
    let data = await getMapsService();
    res.send(data)
}
module.exports = getMaps;