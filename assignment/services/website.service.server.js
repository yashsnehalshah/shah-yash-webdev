module.exports = function(app,models) {
    var websiteModel=models.websiteModel;

    var websites = [
     { _id: 123, name: "Facebook", description: "facebook",   developerId: 456 },
     { _id: 234, name: "Tweeter",  description: "twitter",   developerId: 456 },
     { _id: 456, name: "Gizmodo",  description: "gizmodo",   developerId: 456 },
     { _id: 567, name: "Tic Tac Toe", description: "tictactoe",developerId: 123 },
     { _id: 678, name: "Checkers", description: "checkers",   developerId: 123 },
     { _id: 789, name: "Chess",    description: "chess",   developerId: 234 }
     ];


    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId=req.params.userId;
        websiteModel.createWebsite(userId,website)
            .then(function(website) {
                res.json(website);
            },function(error) {
                res.statusCode(404).send(error);
            });
    }


    function findAllWebsitesForUser(req, res) {
        var uid = req.params.userId;
        websiteModel.findAllWebsitesForUser(uid)
            .then(function (websites) {
                res.json(websites);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }


    function findWebsiteById(req,res) {
        var wid=req.params.websiteId;
        websiteModel.findWebsiteById(wid)
            .then(function (website) {
                res.json(website);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function updateWebsite(req,res) {
        var website=req.body;
        var wid=req.params.websiteId;
        websiteModel.updateWebsite(wid,website)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function deleteWebsite(req,res) {
        var wid=req.params.websiteId;
        websiteModel.deleteWebsite(wid)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }
};