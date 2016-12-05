(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$routeParams, UserService,$rootScope) {
        var vm = this;

        var userId = $routeParams['uid'];
        var id=$rootScope.currentUser._id;

        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.logout=logout;

        function init() {
            UserService
                .findUserById(id)
                .then(function (user) {
                    vm.user = user.data;
                });
        }
        init();


        function updateUser(someuser) {
            UserService.updateUser(id, someuser)
                .then(function (response) {
                    console.log(response.data);
                    vm.success = "Success";
                })
        }

        function deleteUser() {
            UserService
                .deleteUser(id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){
                  console.log("Unable to delete user");
                });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login")
                    },function (error) {
                        $location.url("/login")
                    }
                )
        }

    }


})();