

module.exports = (app) => {

    var doggos = require("../data/doggos");
    var humanos = require("../data/humanos");

    app.get("/api/doggos", (req, res) => {
        res.json(doggos);
    });
    app.get("/api/humanos", (req, res) => {
        res.json(humanos);
    });
}