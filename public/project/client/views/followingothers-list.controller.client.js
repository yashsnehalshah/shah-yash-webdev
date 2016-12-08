(function(){
    angular
        .module("MyMovieApp")
        .controller("FollowingotherslistController", FollowingotherslistController);

    function FollowingotherslistController($routeParams, FollowingService) {
        var vm = this;

        var userId = $routeParams['uid'];
        vm.id=userId;
        function init() {
            FollowingService.findAllFollowingUserId(vm.id)

                .success(function(followingusers){
                    vm.followeduser = followingusers;
                })
                .error(function(error){
                    console.log("Not following anyone");
                })
        }
        init();

    }
})();