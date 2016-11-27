(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController)


    function EditPageController($location,$routeParams,PageService){
        var vm = this;

        var userId = $routeParams['uid'];
        var websiteId=$routeParams['wid'];
        var pageId=$routeParams['pid'];
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.updatePage=updatePage;
        vm.deletePage=deletePage;

function init(){
    PageService.findPageByWebsiteId(vm.websiteId)
        .then(function (res) {
            vm.pages=res.data;
        })
    PageService.findPageById(vm.pageId)
        .then(function (res) {
            vm.page=res.data;
        })
}
init();



        function updatePage(pagename,pagetitle){

          PageService.updatePage(vm.pageId,pagename,pagetitle)


              .then(function (res) {
                  var success=res.data;
                  if(success){
                      $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                  }
                  else{
                      console.log("Unable to update page");
                  }
              })

        }

        function deletePage(){

            PageService.deletePage(vm.pageId)
                .then(function (res) {
                    var success=res.data;
                    if(success){
                        $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page");
                    }
                    else{
                        console.log("Unable to delete page");
                    }
                })

        }

    }

})();