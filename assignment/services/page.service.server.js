module.exports = function(app) {
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
        pages.push(page);
        res.send(pages);
        return;
    }

    function findPageById(req,res) {
        var pid=req.params.pageId;
        for(var p in pages){
            if(pages[p]._id==pid){
                res.send(pages[p]);
                return;
            }
        }
        res.send(null);
        return;
    }

    function findAllPagesForWebsite(req,res) {
        var wid=req.params.websiteId;
        var result=[];
        for(var p in pages){
            if(pages[p].websiteId==wid){
                result.push(pages[p]);
            }
        }
        res.send(result);
        return;
    }
    function updatePage(req,res) {
        var page=req.body;
        for(var p in pages){
            if(pages[p]._id===page._id){
                pages[p].name=page.name;
                pages[p].title=page.title;
                res.send(true);
                return;
            }
        }
        res.send(false);
        return;
    }

    function deletePage(req,res) {
        var pid=req.params.pageId;
        for(var p in pages){
            if(pages[p]._id===pid){
                pages.splice(i,1);
                res.send(true);
                return;
            }
        }
        res.send(false);
        return;
    }

};