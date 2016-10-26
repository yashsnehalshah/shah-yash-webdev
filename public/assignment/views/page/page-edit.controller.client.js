(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)


    function EditPageController($location,$routeParams,PageService){
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        var websiteId=parseInt($routeParams['wid']);
        var pageId=parseInt($routeParams['pid']);
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;
        vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
        vm.page=PageService.findPageById(vm.pageId);

        function updatePage(pagename,pagetitle){

          var updatedpage={

              _id:vm.pageId,
              name:pagename,
              title:pagetitle,
            websiteId:vm.websiteId

          }

          PageService.updatePage(vm.pageId,updatedpage);


                $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");


        }

        function deletePage(){

            PageService.deletePage(vm.pageId);



                $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");



        }

    }

})();