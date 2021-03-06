(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController)


    function NewPageController($location,$routeParams,PageService){
        var vm=this;
        var userId = $routeParams['uid'];
        var websiteId=$routeParams['wid'];
        vm.id=userId;
        vm.websiteId=websiteId;

        vm.createPage=createPage;


        function init()
        {
            PageService.findPageByWebsiteId(vm.websiteId)
                .then(function (res) {
                    vm.pages=res.data;
                })
        }
        init();

        function createPage(pagename,pagetitle){

            PageService.createPage(vm.websiteId,pagename,pagetitle)


                .then(function (response) {
                    var success=response.data;
                    if(success){
                        $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                    }
                    else{
                        console.log("Unable to create new page");
                    }
                })


        }

    }

})();