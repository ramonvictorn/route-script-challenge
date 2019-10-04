/**
 * @file addUser.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'add user' feature
 * @module controllers/addUser
 */
module.exports = addUser;
const userService = require('../../services/user.js');
/**
 * This function receive the user data and call service to save
 *
 * @param {Object} req - The request 
 * @param {Object} req.body - The request body with the following params
 * @param {string} req.name - The name user
 * @param {string} req.email - The email user
 * @param {string} req.password - The password user
 * @param {Object} res - The response params
 * @return {Object} The object with data or error
 */
async function addUser(req,res){
    if(!verifyParams(req.body)){
        res.status(400).send({error:'INVALID_PARAMS'});
        return;
    }
    let context = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    let dataFromService = await userService.addUser(context);
    res.status(dataFromService.code).send(dataFromService.data)
}

/**
 * This function receive the user data and return true if are corrects or false if not
 * @param {Object} params - The request params
 * @return {bool} True if correct or false if not
 */
function verifyParams(params){
    if(params.name == undefined || params.name.length == 0) return false;
    if(params.email == undefined || params.email.length == 0) return false;
    if(params.password == undefined || params.password.length == 0 ) return false;
    return true;
}