// controllers
const getMapsController = require('./controllers/getMaps.js');
const addRouteController = require('./controllers/addRoute.js');
const loginController = require('./controllers/login.js');
// midlewares
const authenticationValidadeToken = require('../services/authentication.js').validadeToken;
module.exports =  function initRoutes(app){
    app.get('/status', (req,res)=>{
        res.send({data:Date.now()})
    })
    app.get('/api/maps', getMapsController);
    app.post('/api/routes',authenticationValidadeToken, addRouteController);
    app.post('/api/login', loginController);
}