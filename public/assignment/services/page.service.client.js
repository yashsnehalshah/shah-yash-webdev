(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    var pages = [
            { _id: 321, name: "Post 1",  title: "post1", websiteId: 456 },
            { _id: 432, name: "Post 2", title: "post1", websiteId: 456 },
            { _id: 543, name: "Post 3", title: "post1", websiteId: 456 },
            { _id: 548, name: "Post 4", title: "post1", websiteId: 567 },
            { _id: 549, name: "Post 5", title: "post1", websiteId: 678 }
        ]


    function PageService() {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;


        function createPage(websiteId, page){
         page.websiteId=websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId){
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }


        function findPageById(pageId){
            for(var p in pages) {
                page = pages[p];
                if(page._id === pageId) {
                    return page;
                }
            }
            return null;
        }

        function updatePage(pageId, page){
            for(var p in pages) {
                pg = pages[p];
                if(    pg._id === pageId) {
                    pg.name=page.name;
                    pg.websiteId=page.websiteId;
                }
            }
            return null;
        }

        function deletePage(pageId){
            for(var p in pages) {
                page = pages[p];
                if(page._id === pageId) {
                    pages.splice(p,1);
                }
            }
            return null;
        }
    }
})();
