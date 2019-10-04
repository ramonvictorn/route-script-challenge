/**
 * @file login.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'login' feature
 * @module controllers/login
 */
const createTokenService = require('../../services/authentication.js').createToken;
module.exports = login;
async function login(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        email: req.body.email,
        password: req.body.password,
    };
    let dataFromService = await createTokenService(context);
    if(dataFromService.error){
        res.status(dataFromService.code).send(dataFromService.error);
        return;
    }
    res.cookie('token',dataFromService.data, { expires: new Date(Date.now() + 30000), httpOnly: true })
    res.status(dataFromService.code).send(dataFromService.data)
}

/**
 * This function receive the user data and return true if are corrects or false if not
 * @param {Object} params - The object with the params
 * @param {Object[]} params.email - The email user
 * @param {string} params.password - The password user
 * @return {boolean} True if correct or false if not
 */
function verifyParams(params){
    if(params.email == undefined || params.email.length == 0) return false;
    if(params.password == undefined || params.password.length == 0 ) return false;
    return true;
}