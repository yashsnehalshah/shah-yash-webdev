(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController)


    function EditWidgetController($location,$routeParams,WidgetService){
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];
        var widgetId=$routeParams['wgid'];
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.widgetId=widgetId;

        vm.updateWidget=updateWidget;
        vm.deleteWidget=deleteWidget;

        function init(){
            WidgetService.findWidgetById(vm.widgetId)
                .then(function (res) {
                    vm.widget=res.data;
                })

        }

        init();


        function deleteWidget(){
            var result=WidgetService.deleteWidget(vm.widgetId);
            if(result){
                $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }
            else{
                console.log("unable to delete widget");
            }

        }

        function updateWidget(awidget){


                WidgetService.updateWidget(vm.widgetId,awidget)
                    .then(function (res) {
                        if(res){
                            $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                        }
                        else{
                            console.log("unable to update widget");
                        }
                    })


        }



    }

})();