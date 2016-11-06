module.exports=function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });


    var widgets = [
        { _id: 123, widgetType: "HEADER", pageId: 548, size: 2, text: "GIZMODO"},
        { _id: 234, widgetType: "HEADER", pageId: 548, size: 4, text: "Lorem ipsum"},
        { _id: 345, widgetType: "IMAGE", pageId: 548, width: "100%",
            url: "http://lorempixel.com/400/200/"},
        { _id: 456, widgetType: "HTML", pageId: 548, text: "<p>Lorem ipsum</p>"},
        { _id: 567, widgetType: "HEADER", pageId: 548, size: 4, text: "Lorem ipsum"},
        { _id: 678, widgetType: "YOUTUBE", pageId: 548, width: "100%",
            url: "https://youtu.be/AM2Ivdi9c4E" },
        { _id: 789, widgetType: "HTML", pageId: 548, text: "<p>Lorem ipsum</p>"}
    ]


    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", updateWidgetLocation);

    function uploadImage(req, res) {

        var userId = parseInt(req.body.userId);
        var websiteId = parseInt(req.body.websiteId);
        var pageId = parseInt(req.body.pageId);
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        if (myFile == null) {
            res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
            return;
        }
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        for(var i in widgets){
            if(widgets[i]._id==widgetId){
                widgets[i].url="/uploads/"+filename;
            }
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }


    function createWidget(req,res) {
        var widget=req.body;
        widgets.push(widget);
        res.send(widget);
    }


    function findWidgetById(req,res) {
        var wgid=req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id==wgid){
                res.send(widgets[w]);
                return;
            }
        }
        res.send(null);
        return;
    }

    function findAllWidgetsForPage(req,res) {
        var pid=req.params.pageId;
        var result=[];
        for(var w in widgets){
            if(widgets[w].pageId == pid){
                result.push(widgets[w]);
            }
        }
        res.send(result);
        return;
    }

    function updateWidget(req,res) {
        var wgid=req.params.widgetId;
        var widget=req.body;
        if(widget.widgetType=="HEADER"){
            for(var w in widgets){
                if(widgets[w]._id==wgid){
                    widgets[w].size=widget.size;
                    widgets[w].text=widget.text;
                    widgets[w].name=widget.name;
                    res.send(true);
                    return;
                }
            }
            return false;
        }
        else if(widget.widgetType=="YOUTUBE"){
            for(var w in widgets){
                if(widgets[w]._id==wgid){
                    widgets[w].width=widget.width;
                    widgets[w].text=widget.text;
                    widgets[w].name=widget.name;
                    widgets[w].url=widget.url;
                    res.send(true);
                    return;
                }
            }
            res.send(false);
            return;
        }
        else if(widget.widgetType=="IMAGE"){
            for(var w in widgets){
                if(widgets[w]._id==wgid){
                    widgets[w].width=widget.width;
                    widgets[w].text=widget.text;
                    widgets[w].name=widget.name;
                    widgets[w].url=widget.url;
                    res.send(true);
                    return;
                }
            }
            res.send(false);
            return;
        }

        else if(widget.widgetType=="HTML"){
            for(var i in widgets){
                if(widgets[i]._id==wgid){
                    widgets[i].text=widget.text;
                    res.send(true);
                    return;
                }
            }
            res.send(false);
            return;
        }
    }


    function deleteWidget(req,res) {
        var wgid=req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id==wgid){
                widgets.splice(i,1);
                res.send(true);
                return;
            }
        }
        res.send(false);
        return;
    }
    function updateWidgetLocation(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        widgets.splice(final, 0, widgets.splice(initial, 1)[0]);
    }

};