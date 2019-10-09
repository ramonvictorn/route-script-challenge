const userModel = require('../models/user.js');
const settings = require('../config/settings.js');
module.exports = {
    addUser,
}
async function addUser(context){
    if(context.key !== settings.PRIVATE_KEY){
        return {code:400,data:{error:"KEY_INVALID"}}
    }
    let dataFromModel = await userModel.addUser(context)
    if(dataFromModel.error){
        return {code:400,data:{error:"ERROR_ON_ADD_USER"}}
    }else{
        return {code:200,data:{data:dataFromModel.data}}
    }
}
// getUser
// EditUser
// DeleteUser