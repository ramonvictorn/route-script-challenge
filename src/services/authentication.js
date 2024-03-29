/**
 * @file authentication.js
 * @author Ramon Victor <ramonvictorn@gmail.com>
 * @summary Implements the 'authentication' feature
 * @module services/authentication
 */
const jwt = require("jsonwebtoken");
const settings = require("../config/settings.js");
const logger = require('../loaders/logger.js');
const userModel = require("../models/user.js");
module.exports = {
    createToken,
    validadeToken,
    tokenIsValid,
}

/**
 * This function receive user params and attemp create token
 * @apiparam {Object} context - The request body with the following params
 * @apiparam {string} context.email - The email user
 * @apiparam {string} context.password - The password user
 * @return {Object} The object with data or error and code
 */
async function createToken(context){
    let dataUser = await userModel.getUser(context);
    if(dataUser && dataUser.data != null){
        logger.log("authentication - createToken - creating token");
        let expirationDate = Math.floor(Date.now()/1000) + 86400; //1 day
        let token = jwt.sign({email:context.email,idUser:dataUser.data.id,exp:expirationDate},settings.PRIVATE_KEY)
        return {data:token,code:200};
    }else{
        return {error:'USER_NOT_FOUND',code:400};
    }
}


/**
 * This function attempt get token in cookies or on header to validate the request
 * @apiparam {Object} req - The request body with the following params
 * @apiparam {Object} req.cookies - The cookies
 * @apiparam {string} req.cookies.token - The token to validate
 * @apiparam {Object} req.headers - The headers of request
 * @apiparam {string} [req.headers.authorization] - The token to validate (if not have cookies)
 * @apiparam {Object} res - The response params
 * @return {Object} The object with data or error and code
 */
function validadeToken(req,res,next){
    const token = req.cookies.token || req.headers["authorization"];
    if (!token){
        logger.log("authentication - validadeToken - Access denied");
        res.status(401).send({error:"Access denied. No token provided."});
        return; 
    } 
        
    try {
        logger.log("authentication - validadeToken - deconding token")
        const decoded = jwt.verify(token, settings.PRIVATE_KEY);
        req.user = decoded;
        logger.log('validadeToken decoded ', decoded.email)
        next();
    } catch (ex) {
        logger.log("authentication - validadeToken - Invalid token.")
        res.status(401).send("Invalid token.");
    }
}

function tokenIsValid(req,res,next){
    const token = req.cookies.token || req.headers["authorization"];
    if (!token){
        logger.log("authentication - validadeToken - Access denied");
        res.status(401).send({data:false});
        return; 
    } 
        
    try {
        logger.log("authentication - validadeToken - deconding token")
        const decoded = jwt.verify(token, settings.PRIVATE_KEY);
        req.user = decoded;
        res.status(200).send({data:true});
    } catch (ex) {
        logger.log("authentication - validadeToken - Invalid token.")
        res.status(401).send({data:false});
    }
}