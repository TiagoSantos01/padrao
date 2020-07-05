const routes = require("express").Router(),
    jsonParser = require("body-parser").json(),
    controllers = require("./controller/controllers");

//  POST
// routes.get('/', jsonParser, controllers.home);

module.exports=app=>{
   app.get('/', jsonParser, controllers.home);
};