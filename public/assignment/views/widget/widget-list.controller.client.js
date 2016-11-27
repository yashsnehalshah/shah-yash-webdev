(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)


    function WidgetListController($routeParams,WidgetService,$sce){
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.getSafeHTML=getSafeHTML;
        vm.getSafeURL=getSafeURL;
        vm.reorderWidget=reorderWidget;


        function init()
        {
            WidgetService.findWidgetsByPageId(vm.pageId)
                .then(function (res) {
                    vm.widgets=res.data;
                });


            /*var widgets = $(".wam-widgets")
                 .sortable({
                     axis: 'y'
                           });*/
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


        function reorderWidget(start, end) {

            WidgetService
                .sort(vm.pageId, start, end)
                .then(
                    function (res) {
                        console.log("Success")
                        init();
                    });
        }



    }

})();