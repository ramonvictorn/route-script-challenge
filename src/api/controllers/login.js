    const createTokenService  = require('../../services/authentication.js').createToken;
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
    let dataReturned = await createTokenService(context);
    console.log('depois do await do authentication', dataReturned);
    res.cookie('toker',dataReturned.token, { expires: new Date(Date.now() + 30000), httpOnly: true })
    res.send(dataReturned);
}
function verifyParams(params){
    if(params.email == undefined || params.email.length == 0) return false;
    if(params.password == undefined || params.password.length == 0 ) return false;
    return true;
}