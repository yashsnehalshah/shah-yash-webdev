(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    /*var pages = [
            { _id: 321, name: "Post 1",  title: "post1", websiteId: 456 },
            { _id: 432, name: "Post 2", title: "post1", websiteId: 456 },
            { _id: 543, name: "Post 3", title: "post1", websiteId: 456 },
            { _id: 548, name: "Post 4", title: "post1", websiteId: 567 },
            { _id: 549, name: "Post 5", title: "post1", websiteId: 678 }
        ]
*/

    function PageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;


        function createPage(websiteId,name,title){
         var page={
             _id:(new Date()).getTime()+"",
             name:name,
             websiteId:websiteId,
             title:title
         };
            var url="/api/website/"+websiteId+"/page";
            return $http.post(url,page);
        }

        function findPageByWebsiteId(websiteId){
            var url= "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }

        function findPageById(pageId){
            var url="/api/page/"+pageId;
            return $http.get(url);
        }

        function updatePage(pageId, name, title){
            var page={
                _id:pageId,
                name:name,
                title:title
            };
            var url="/api/page/"+pageId;
            return $http.put(url,page);
        }

        function deletePage(pageId){
            var url="/api/page/"+pageId;
            return $http.delete(url);
        }
    }
})();
