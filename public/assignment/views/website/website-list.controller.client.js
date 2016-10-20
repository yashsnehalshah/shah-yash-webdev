(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        vm.id=userId;
        vm.websites = WebsiteService.findWebsitesByUser(vm.id);
    }
})();