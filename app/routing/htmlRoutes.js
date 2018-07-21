var path = require("path");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get("/survey", (req, res) => {
        res.sendFile(path.join(__dirname,"../public/survery.html"));
    });

    app.get("/images/:imageName",(req,res)=>{
        var name = req.params.imageName;
        res.sendFile(path.join(__dirname,"../public/images/"+name));
    })

    app.get("*",(req,res)=>{
        res.status(404);
        res.sendFile(path.join(__dirname,"../public/404.html"));
    });

    
};