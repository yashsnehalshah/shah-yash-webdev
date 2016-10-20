(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController)


    function EditWebsiteController($location,$routeParams,WebsiteService){
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        vm.id=userId;

        var websiteId = parseInt($routeParams['wid']);
        vm.websiteId=websiteId;

        vm.updateWebsite=updateWebsite;
        vm.deleteWebsite=deleteWebsite;
        vm.website=WebsiteService.findWebsiteById(vm.websiteId);
        vm.websites=WebsiteService.findWebsitesByUser(wm.id);

        function updateWebsite(n,d){
            var updatedcontent={
                _id:websiteId,
                name:n,
                description:d,
                developerId:userId

            };

            WebsiteService.updateWebsite(websiteId,updatedcontent);

            if(WebsiteService.updateWebsite(websiteId,updatedcontent) === null)
            {
                vm.error="Unable to update website";
            }
            else{
                $location.url("/user/"+vm.id+"/website");
            }
        }

        function deleteWebsite(webid){

            WebsiteService.deleteWebsite(webid);

            if(WebsiteService.deleteWebsite(webid) === null){
                vm.error="Unable to delete website";
            }
            else{
                $location.url("/user/"+vm.id+"/website");
            }

        }

    }

})();