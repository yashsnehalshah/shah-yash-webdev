(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
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



    function WidgetService() {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widget){
            widget.pageId=pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId){
            var result = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    result.push(widgets[w]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId){
            for(var w in widgets) {
                widget = widgets[w];
                if(widget._id === widgetId) {
                    return widget;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget){
            for(var w in widgets) {
                wd = widgets[w];
                if(    wd._id === widgetId) {
                    wd.widgetType=widget.widgetType;
                    wd.pageId=widget.pageId;
                    wd.size=widget.size;
                    wd.text=widget.text;
                }
            }
            return null;
        }

        function deleteWidget(widgetId){
            for(var w in widgets) {
                widget = widgets[w];
                if(widget._id === widgetId) {
                    widgets.splice(w,1);
                }
            }
            return null;
        }

    }
})();
