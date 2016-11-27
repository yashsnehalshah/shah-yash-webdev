(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)


    function NewWebsiteController($location,$routeParams,WebsiteService){
        var vm = this;

        var userId = $routeParams['uid'];
        vm.id=userId;
        vm.createNewWebsite=createNewWebsite;


        function init()
        {
            WebsiteService.findWebsitesByUser(vm.id)
                .then(function (res) {
                    vm.websites=res.data;
                })
        }

        init();



        function createNewWebsite(n,d){
            WebsiteService.createWebsite(n,d,vm.id)
                .then(function (res) {
                    var newWebsite=res.data;
                    if(newWebsite){
                        $location.url("/user/"+vm.id+"/website");
                    }
                    else{
                        console.log("unable to create website");
                    }
                })


        }

    }

})();