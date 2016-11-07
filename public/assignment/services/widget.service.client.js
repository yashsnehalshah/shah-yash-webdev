(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    /*var widgets = [
            { _id: 123, widgetType: "HEADER", pageId: 548, size: 2, text: "GIZMODO"},
            { _id: 234, widgetType: "HEADER", pageId: 548, size: 4, text: "Lorem ipsum"},
            { _id: 345, widgetType: "IMAGE", pageId: 548, width: "100%",
                url: "http://lorempixel.com/400/200/"},
            { _id: 456, widgetType: "HTML", pageId: 548, text: "<p>Lorem ipsum</p>"},
            { _id: 567, widgetType: "HEADER", pageId: 548, size: 4, text: "Lorem ipsum"},
            { _id: 678, widgetType: "YOUTUBE", pageId: 548, width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E" },
            { _id: 789, widgetType: "HTML", pageId: 548, text: "<p>Lorem ipsum</p>"}
        ]*/



    function WidgetService($http) {

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sort: sort
        };
        return api;

        function createWidget(pageId, widget){
            var url="/api/page/"+pageId+"/widget";
            return $http.post(url,widget);
        }

        function findWidgetsByPageId(pageId){
            var url="/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId){
            var url="/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget){
            var url="/api/widget/"+widgetId;
            return $http.put(url,widget);
        }

        function deleteWidget(widgetId){
            var url="/api/widget/"+widgetId;
            return $http.delete(url);
        }

        function sort(pageId, start, end) {
            var url = "/api/page/"+pageId+"/widget?initial="+start+"&final="+end;
            return $http.put(url);
        }

    }
})();
