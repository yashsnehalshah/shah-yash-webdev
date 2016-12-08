(function() {
    angular
        .module("MyMovieApp")
        .controller("OtheruserdetailsController", OtheruserdetailsController);

    function OtheruserdetailsController($routeParams, MovieService, FavoriteService, ReviewService, UserService, FollowingService) {
        var vm = this;

        vm.userId=$routeParams['uid'];
        vm.otherId=$routeParams['oid'];

        vm.addFollowing=addFollowing;

        function init() {
            FavoriteService
                .findAllFavoriteByUserId(vm.otherId)
                .then
                (function (response) {

                    vm.favorites = response.data;



                }, function (error) {
                    vm.error = "No favorites found";
                })

            ReviewService
                .findAllReviewsByUserId(vm.otherId)
                .then(function (resp) {
                    vm.reviews=resp.data;
                },function (error) {
                    vm.error="No reviews found";
                })
        }
        init();

        function  addFollowing() {
            FollowingService
                .addFollowing(vm.userId, vm.otherId )
                .then(
                    function (response) {
                        vm.success = "You started following a user";
                    },
                    function (error) {
                        vm.error = "Some error";
                    }
                );

        }

    }
})();