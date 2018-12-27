var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 80;
var app = express();

app.listen(PORT,(err)=>{
    console.log("App listening on port "+PORT);
})

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);
