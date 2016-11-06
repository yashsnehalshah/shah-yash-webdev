(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    /*var websites = [
            { _id: 123, name: "Facebook", description: "facebook",   developerId: 456 },
            { _id: 234, name: "Tweeter",  description: "twitter",   developerId: 456 },
            { _id: 456, name: "Gizmodo",  description: "gizmodo",   developerId: 456 },
            { _id: 567, name: "Tic Tac Toe", description: "tictactoe",developerId: 123 },
            { _id: 678, name: "Checkers", description: "checkers",   developerId: 123 },
            { _id: 789, name: "Chess",    description: "chess",   developerId: 234 }
        ]*/


    function WebsiteService($http) {

        var api = {
            findWebsitesByUser: findWebsitesByUser,
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function findWebsitesByUser(userId){
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);


        }

        function createWebsite(userId, name, description){
            var awebsite={
                _id:(new Date()).getTime()+"",
                name:name,
                developerId:userId,
                description:description
            };
            var url = "/api/user/"+userId+"/website";
            return $http.post(url,awebsite);
        }

        function findWebsiteById(websiteId){
            var url="/api/website/"+websiteId;
            return $http.get(url);
        }

        function updateWebsite(website){
            var url="/api/website/"+website._id;
            return $http.put(url,website);
        }


        function deleteWebsite(websiteId){
            var url="/api/website/"+websiteId;
            return $http.delete(url);
        }



    }
})();
