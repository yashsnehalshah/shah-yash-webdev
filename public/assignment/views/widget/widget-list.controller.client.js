(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)


    function WidgetListController($routeParams,WidgetService,$sce){
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId=parseInt($routeParams['wid']);
        var pageId=parseInt($routeParams['pid']);
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.getSafeHTML=getSafeHTML;
        vm.getSafeURL=getSafeURL;
        vm.widgets=WidgetService.findWidgetsByPageId(vm.pageId);


        function getSafeHTML(widget){
             return $sce.trustAsHtml(widget.text);
        }

        function getSafeURL(widget){
            var parts=widget.url.split("/");
            var id=parts[parts.length -1];
            var url="https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);

        }


    }

})();