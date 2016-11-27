module.exports = function(app,models) {

    var pageModel=models.pageModel;

    var pages = [
        { _id: 321, name: "Post 1",  title: "post1", websiteId: 456 },
        { _id: 432, name: "Post 2", title: "post1", websiteId: 456 },
        { _id: 543, name: "Post 3", title: "post1", websiteId: 456 },
        { _id: 548, name: "Post 4", title: "post1", websiteId: 567 },
        { _id: 549, name: "Post 5", title: "post1", websiteId: 678 }
    ]

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/page/:pageId",findPageById);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(req, res) {
        var page = req.body;
        pageModel.createPage(page)
            .then(function (status){
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findPageById(req,res) {
        var pid=req.params.pageId;
        pageModel.findPageById(pid)
            .then(function (page) {
                res.json(page);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findAllPagesForWebsite(req,res) {
        var wid=req.params.websiteId;
        pageModel.findAllPagesForWebsite(wid)
            .then(function (pages) {
                res.json(pages);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }


    function updatePage(req,res) {
        var page=req.body;
        var pid=req.params.pageId;
        pageModel.updatePage(page,pid)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function deletePage(req,res) {
        var pid=req.params.pageId;
        pageModel.deletePage(pid)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })

    }

};