(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)


    function EditWebsiteController($location,$routeParams,WebsiteService){
        var vm = this;

        var userId = $routeParams['uid'];
        vm.id=userId;

        var websiteId = $routeParams['wid'];
        vm.websiteId=websiteId;

        vm.updateWebsite=updateWebsite;
        vm.deleteWebsite=deleteWebsite;


        function init()
        {
            WebsiteService.findWebsiteById(vm.websiteId)
                .success(function (res) {
                    vm.website=res;
                })
            WebsiteService.findWebsitesByUser(vm.id)
                .success(function (res) {
                    vm.websites=res;
                })
        }

        init();


        function updateWebsite(){

            WebsiteService.updateWebsite(vm.website)

                .then(function (res) {
                    var result=res.data;
                    if(result){
                        $location.url("/user/"+vm.id+"/website");
                    }
                    else{
                        console.log("Website could not be updated");
                    }
                })

        }

        function deleteWebsite(webid){
            var result=
                WebsiteService.deleteWebsite(webid)
                    .then(function (res) {
                        var result=res.data;
                        if(result){
                            $location.url("/user/"+vm.id+"/website");
                        }
                        else{
                            console.log("Unable to delete website");
                        }
                    })

            }

    }

})();