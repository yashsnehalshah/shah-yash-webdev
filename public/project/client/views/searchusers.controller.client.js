(function(){
    angular
        .module("MyMovieApp")
        .controller("SearchusersController",SearchusersController);


    function SearchusersController($location, $routeParams, UserService, $rootScope) {

        var vm = this;
        vm.searchUsers = searchUsers;
        vm.userId=$routeParams['uid'];


    function searchUsers(searchText) {
        UserService
            .findUserByUsername(searchText)
            .then(function (response) {
                    vm.users = response.data;



                    if(vm.users===null){
                        vm.error = "User not found!";
                    }

                },
                function (error) {
                    vm.error = "User not found!";
                });
    }


    }
})();