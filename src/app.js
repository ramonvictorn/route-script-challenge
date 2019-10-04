const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');


// local files
const initDb = require('./loaders/db.js');
const initRoutes = require('./api/routes.js');
const setting = require('./config/settings.js');
const logger = require('./loaders/logger.js');

async function startServer(){
    const app = express();
    app.use(compression());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use((req,res,next)=>{
        logger.log(req.method , ' - ', req.url);
        next();
    })
    app.use('/assets', express.static(__dirname + '/web/public/assets/'))
    initRoutes(app);
    app.get('*', (req,res)=>{
        res.sendFile(path.join(__dirname+'/web/public/views/index.html'));
    })
    initDb(()=>{
        app.listen(setting.APP_PORT, ()=>{
            logger.log(`Listening on ${setting.APP_PORT}`)
        })
    })
    
}
startServer();