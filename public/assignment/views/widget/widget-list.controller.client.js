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


        function init()
        {
            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function (res) {
                    vm.widgets=res.data;
                })


            var widgets = $(".wam-widgets")
                 .sortable({
                     axis: 'y'
                           });
        }

        init();


        function getSafeHTML(awidget){
             return $sce.trustAsHtml(awidget.text);
        }

        function getSafeURL(awidget){
            var parts=awidget.url.split("/");
            var id=parts[parts.length -1];
            var url="https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);

        }


    }

})();