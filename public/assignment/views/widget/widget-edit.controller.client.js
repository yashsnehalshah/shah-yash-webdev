(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController)


    function EditWidgetController($location,$routeParams,WidgetService){
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId=parseInt($routeParams['wid']);
        var pageId=parseInt($routeParams['pid']);
        var widgetId=parseInt($routeParams['wgid']);
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.widgetId=widgetId;
        vm.widget=WidgetService.findWidgetById(vm.widgetId);
        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function updateWidget(widget){
             WidgetService.updateWidget(vm.widgetId,widget);
            $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

        }



    }

})();