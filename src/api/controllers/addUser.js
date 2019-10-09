/**
 * @file addUser.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'add user' feature
 * @module controllers/addUser
 */
module.exports = addUser;
const userService = require('../../services/user.js');
/**
 * @api {POST} /api/user AddUser
 * @apiDescription This function receive the user data and call service to save
 * @apiName AddUser
 * @apiGroup User
 * @apiparam {Object} req - The request 
 * @apiparam {Object} req.body - The request body with the following params
 * @apiparam {string} req.name - The name user
 * @apiparam {string} req.email - The email user
 * @apiparam {string} req.password - The password user
 * @apiparam {string} req.key - The key used on setting file 
 * @apiparam {Object} res - The response params
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
        key: req.body.key,
    }
    let dataFromService = await userService.addUser(context);
    res.status(dataFromService.code).send(dataFromService.data)
}
// * This function receive the user data and return true if are corrects or false if not

/**
 * @apiparam {Object} params - The request params
 * @return {bool} True if correct or false if not
 */
function verifyParams(params){
    if(params.name == undefined || params.name.length == 0) return false;
    if(params.email == undefined || params.email.length == 0) return false;
    if(params.password == undefined || params.password.length == 0 ) return false;
    if(params.key == undefined || params.key.length == 0 ) return false;
    return true;
}