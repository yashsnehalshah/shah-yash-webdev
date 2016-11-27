(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)


    function PageListController($routeParams,PageService){
        var vm = this;

        var userId = $routeParams['uid'];
        var websiteId=$routeParams['wid'];
        vm.id=userId;
        vm.websiteId=websiteId;
        
        function init()
        {
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function (res) {
                    vm.pages=res.data;
                })
        }
        
        init();
        
        

    }

})();