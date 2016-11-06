(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        vm.id=userId;
        function init() {
            WebsiteService.findWebsitesForUser(vm.id)

                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();

    }
})();