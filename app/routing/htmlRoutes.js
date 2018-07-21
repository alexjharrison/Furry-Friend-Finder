var path = require("path");

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get("/survey", (req, res) => {
        res.sendFile(path.join(__dirname,"../public/survery.html"));
    });

    app.get("/:folderName/:fileName",(req,res)=>{
        var folder = req.params.folderName;
        var file = req.params.fileName;
        res.sendFile(path.join(__dirname,"../public/"+folder+"/"+file));
    });

    app.get("/:fileName",(req,res)=>{
        var file = req.params.fileName;
        res.sendFile(path.join(__dirname,"../public/"+file));
    });

    app.get("*",(req,res)=>{
        res.status(404);
        res.sendFile(path.join(__dirname,"../public/404.html"));
    });

    
};