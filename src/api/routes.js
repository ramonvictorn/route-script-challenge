// controllers
const getMapsController = require('./controllers/getMaps.js');
const addRouteController = require('./controllers/addRoute.js');
const loginController = require('./controllers/login.js');
const addUserController = require('./controllers/addUser.js');
const getRoutesByUserController = require('./controllers/getRoutesByUser.js');
const deleteRouteController = require('./controllers/deleteRoute.js');
// midlewares
const authenticationValidadeToken = require('../services/authentication.js').validadeToken;
const tokenIsValid = require('../services/authentication.js').tokenIsValid;
module.exports =  function initRoutes(app){
    app.get('/status', (req,res)=>{
        res.send({data:Date.now()})
    })
    app.get('/api/maps',authenticationValidadeToken, getMapsController);
    app.post('/api/routes',authenticationValidadeToken, addRouteController);
    app.delete('/api/routes',authenticationValidadeToken,deleteRouteController);
    app.post('/api/login', loginController);
    app.post('/api/user', addUserController);
    app.get('/api/user/routes',authenticationValidadeToken, getRoutesByUserController );
    app.get('/api/isLogged' ,tokenIsValid)
}