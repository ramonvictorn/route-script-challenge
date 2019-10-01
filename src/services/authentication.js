const jwt = require("jsonwebtoken");
const settings = require("../config/settings.js");

module.exports = {
    createToken,
    validadeToken,
}
function createToken(context){
    console.log('createToken');
    let expirationDate = Math.floor(Date.now()/1000) + 30;
    let token = jwt.sign({email:context.email,exp:expirationDate},settings.PRIVATE_KEY)
    return {token};
}
function validadeToken(req,res,next){
    console.log('validadeToken');
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, settings.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }
}
// module.exports = function(req, res, next) {
//   //get the token from the header if present
//   const token = req.headers["x-access-token"] || req.headers["authorization"];
//   //if no token found, return response (without going to the next middelware)
//   if (!token) return res.status(401).send("Access denied. No token provided.");

//   try {
//     //if can verify the token, set req.user and pass to next middleware
//     const decoded = jwt.verify(token, settings.PRIVATE_KEY);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     //if invalid token
//     res.status(400).send("Invalid token.");
//   }
// };