const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = require('./Schemas/UserSchema.js');
const logger = require('../loaders/logger.js')
module.exports = {
    addUser,
    getUser,
}
function addUser(context){
    let User = new UserSchema({
        name : context.name,
        email: context.email,
        password : context.password,
    })

    return new Promise((resolve,reject)=>{
        User.save()
        .then(doc => {
            logger.log('saved - >',doc);
            resolve({data:doc});
        })
        .catch(err => {
            logger.log('err-> ',err);
            resolve({error:err});
        })
    })
}

function getUser(context){
    const hash = crypto.createHash('sha256');
    return new Promise((resolve,reject)=>{
        let query = {
            email:context.email,
        };
        hash.update(context.password);
        query.password = hash.digest('hex');

        UserSchema.findOne(query,)
            .then((docs)=>{
                resolve({data:docs});
            })
            .catch((err)=>{
                resolve({error:err})
            })
    })
}