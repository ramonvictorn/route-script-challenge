var mongoose = require('mongoose');
const logger = require('./logger.js');
const settings = require('../config/settings.js');
/**
 * @function initDb
 * @apiparam {function} cb - Callback to run affer connection with databases 
 */
function initDb(cb){
    logger.log(`db.js - initDb Connectin with database ${settings.DB_HOST}`)
    mongoose.connection.once('open', function() {
        logger.log(`Conectado ao MongoDB - ${settings.DB_HOST}.`)
    });
    mongoose.connect(`mongodb://${settings.DB_USER}:${settings.DB_PASSWORD}@${settings.DB_HOST}:${settings.DB_PORT}/${settings.DB_DATABASE}`,
    { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true }, function(error) {
        if(error){
            logger.log('Erro on connect with databases!!', error);
            // throw Error ('DB_ERROR_ON_CONNECT')
            return;
        }
        cb(mongoose);
    });
}

module.exports = initDb;