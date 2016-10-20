(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
            { _id: 123, name: "Facebook", description: "facebook",   developerId: 456 },
            { _id: 234, name: "Tweeter",  description: "twitter",   developerId: 456 },
            { _id: 456, name: "Gizmodo",  description: "gizmodo",   developerId: 456 },
            { _id: 567, name: "Tic Tac Toe", description: "tictactoe",developerId: 123 },
            { _id: 678, name: "Checkers", description: "checkers",   developerId: 123 },
            { _id: 789, name: "Chess",    description: "chess",   developerId: 234 }
        ]


    function WebsiteService() {

        var api = {
            findWebsitesByUser: findWebsitesByUser,
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsitesByUser(userID) {
            var result = [];
            for(var w in websites) {
                if(websites[w].developerId === userID) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function createWebsite(userId, website){
            website.developerId=userId;
            websites.push(website);
        }

        function findWebsiteById(websiteId){
            for(var w in websites) {
                website = websites[w];
                if(website._id === websiteId) {
                    return website;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website){
            for(var w in websites) {
                wb = websites[w];
                if(    wb._id === websiteId) {
                    wb.name=website.name;
                    wb.developerId=website.developerId;
                    wb.description=website.description;
                }
            }
            return null;
        }


        function deleteWebsite(websiteId){
            for(var w in websites) {
                website = websites[w];
                if(website._id === websiteId) {
                    websites.splice(w,1);
                }
            }
            return null;
        }



    }
})();
