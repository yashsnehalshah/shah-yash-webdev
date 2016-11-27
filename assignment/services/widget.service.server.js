module.exports=function (app,models) {
    var widgetModel=models.widgetModel;
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

        var newWidget = {
            url: "/uploads/"+filename,
            type:"IMAGE",
            _id:widgetId
        };

        widgetModel.updateWidget(newWidget.type, newWidget)
            .then(function (status) {
                    res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId +"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );
    }



    function createWidget(req,res) {
        var newwidget=req.body;
        widgetModel.createWidget(newwidget)
            .then(function (widget){
                res.json(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findWidgetById(req,res) {
        var wgid=req.params.widgetId;
        widgetModel.findWidgetById(wgid)
            .then(function (widget) {
                res.send(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findAllWidgetsForPage(req,res) {
        var pid=req.params.pageId;
        widgetModel.findAllWidgetsForPage(pid)
            .then(function (widgets) {
                res.json(widgets);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function updateWidget(req,res) {
        var wgid=req.params.widgetId;
        var widget=req.body;
        var widgetType=widget.type;
        widgetModel.updateWidget(widgetType,widget)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }



    function deleteWidget(req,res) {
        var wgid=req.params.widgetId;
        widgetModel.deleteWidget(wgid)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }



    function updateWidgetLocation(req, res) {
        var pid=req.params.pageId;
        var initial = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        widgetModel.reorderWidget( initial, final, pid)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }



};