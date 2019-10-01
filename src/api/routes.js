// controllers
const getMapsController = require('./controllers/getMaps.js');
const addRouteController = require('./controllers/addRoute.js');
module.exports =  function initRoutes(app){
    app.get('/status', (req,res)=>{
        res.send({data:Date.now()})
    })
    app.get('/api/maps', getMapsController);
    app.post('/api/routes', addRouteController);
}