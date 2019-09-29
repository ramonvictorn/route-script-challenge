var mongoose = require('mongoose');
const logger = require('./logger.js');
const settings = require('../config/settings.js');
/**
 * @function initDb
 * @param {function} cb - Callback to run affer connection with databases 
 */
function initDb(cb){
    logger.log(`db.js - initDb Connectin with database ${settings.DB_HOST}`)
    mongoose.connection.once('open', function() {
        logger.log('Conectado ao MongoDB.')
    });
    // mongodb://root:password123@127.0.0.1:27017/admin
    // mongoose.connect(`mongodb://${settings.DB_USER}:${settings.DB_PASSWORD}@${settings.DB_HOST}:${settings.DB_PORT}/${settings.DB_DATABASE}`,{ useNewUrlParser: true}, function(error) {
        mongoose.connect(`mongodb://127.0.0.1:27017/admin`,{useNewUrlParser: true, useUnifiedTopology: true}, function(error) {
        if(error){
            logger.log('Erro on connect with databases!!', error);
            // throw Error ('DB_ERROR_ON_CONNECT')
            return;
        }
        // mongoose.set('useNewUrlParser', true);
        cb(mongoose);
    });
}

module.exports = initDb;