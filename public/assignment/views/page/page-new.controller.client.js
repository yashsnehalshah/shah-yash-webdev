(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)


    function NewPageController($location,$routeParams,PageService){
        var vm=this;
        var userId = parseInt($routeParams['uid']);
        var websiteId=parseInt($routeParams['wid']);
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
        vm.createPage=createPage;


        function createPage(pagename,pagetitle){

           var newpage={
             _id:(new Date).getTime()+"",
               name: pagename,
               title:pagetitle,
               websiteId: vm.websiteId


           };

           PageService.createPage(vm.websiteId,newpage);

            $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");

        }

    }

})();