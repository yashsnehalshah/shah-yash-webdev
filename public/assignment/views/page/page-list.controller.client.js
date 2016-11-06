(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)


    function PageListController($routeParams,PageService){
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        var websiteId=parseInt($routeParams['wid']);
        vm.id=userId;
        vm.websiteId=websiteId;
        
        function init()
        {
            PageService.findPageByWebsiteId(vm.websiteId)
                .success(function (res) {
                    vm.pages=res;
                })
        }
        
        init();
        
        

    }

})();