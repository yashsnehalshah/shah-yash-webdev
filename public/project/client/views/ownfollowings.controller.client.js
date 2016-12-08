(function(){
    angular
        .module("MyMovieApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($routeParams, UserService, $location, FollowingService) {

        var vm = this;
        vm.userId=$routeParams['uid'];
        vm.otherId=$routeParams['oid'];


        vm.unFollow = unFollow;


        function init() {

                    FollowingService.findAllFollowingUserId(vm.userId)
                        .then(function (response) {
                            vm.followings=response.data;
                        }, function (error) {
                            vm.error = "error occurred";
                        });


        }
        init();



        function unFollow(usersid,otheruserid) {
            FollowingService
                .unFollowingUser(usersid, otheruserid )
                .then(
                    function (response) {
                        vm.success = "You successfully unfollow";
                    },
                    function (error) {
                        vm.error = "Some internal error has occurred";
                    }
                );
        }

    }
})();