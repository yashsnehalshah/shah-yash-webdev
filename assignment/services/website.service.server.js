module.exports = function(app) {
    var websites = [
     { _id: 123, name: "Facebook", description: "facebook",   developerId: 456 },
     { _id: 234, name: "Tweeter",  description: "twitter",   developerId: 456 },
     { _id: 456, name: "Gizmodo",  description: "gizmodo",   developerId: 456 },
     { _id: 567, name: "Tic Tac Toe", description: "tictactoe",developerId: 123 },
     { _id: 678, name: "Checkers", description: "checkers",   developerId: 123 },
     { _id: 789, name: "Chess",    description: "chess",   developerId: 234 }
     ]


    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/website/:websiteId",findWebsiteById);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        websites.push(website);
        res.send(websites);
        return;
    }

    function findAllWebsitesForUser(req, res) {
        var uid = req.params.userId;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId == uid) {
                result.push(websites[w]);
            }
        }
        res.json(result);
        return;
    }


    function findWebsiteById(req,res) {
        var wid=req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id===wid){
                res.send(websites[w]);
                return;
            }
        }
        res.send(null);
        return;
    }

    function updateWebsite(req,res) {
        var website=req.body;
        for(var w in websites){
            if(websites[w]._id===website._id){
                websites[w].name=website.name;
                websites[w].description=website.description;
                res.send(true);
                return;
            }
        }
        res.send(false);
    }


    function deleteWebsite(req,res) {
        var wid=req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id===wid){
                websites.splice(i,1);
                res.send(true);
                return;
            }
        }
        res.send(false)
        return;
    }

};