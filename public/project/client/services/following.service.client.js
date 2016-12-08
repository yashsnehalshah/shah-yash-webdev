(function () {
    angular
        .module("MyMovieApp")
        .factory("FollowingService", FollowingService );

    function FollowingService($http) {


        var api = {

            addFollowing: addFollowing,
            findFollowing: findFollowing,
            findAllFollowingUserId:findAllFollowingUserId,
            unFollowingUser: unFollowingUser,
            deleteFollowing: deleteFollowing


        };

        return api;

        function addFollowing(userId, followingId) {
            var url = "/api/user/" + userId + "/addfollowing/" + followingId;
            return $http.post(url);
        }


        function findFollowing(userId, followingId) {
            return $http.get("/api/user/follow/" + userId + "/check/" + followingId);
        }


        function findAllFollowingUserId(userId) {
            var url = "/api/user/"+ userId + "/following";
            return $http.get(url);
        }


        function unFollowingUser(userId, followingId) {
            return $http.delete("/api/user/" + userId + "/unfollow/" +followingId);
        }

        function deleteFollowing(userId) {
            return $http.delete("/api/unfollowing/" + userId + "/deleteUser");
        }

    }})();