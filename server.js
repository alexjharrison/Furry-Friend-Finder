var express = require("express");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;
var app = express();

app.listen(PORT,(err)=>{
    console.log("App listening on port "+PORT);
})

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);
