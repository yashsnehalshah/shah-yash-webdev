(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController)


    function NewWebsiteController($location,$routeParams,WebsiteService){
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        vm.id=userId;
        vm.createNewWebsite=createNewWebsite;
        vm.websites=WebsiteService.findWebsitesByUser(vm.id);

        function createNewWebsite(n,d){
         var newcontent={
             _id:(new Date).getTime()+"",
             name:n,
             description:d,
             developerId: vm.id

         };

         WebsiteService.createWebsite(vm.id,newcontent);



             $location.url("/user/"+vm.id+"/website");


        }

    }

})();