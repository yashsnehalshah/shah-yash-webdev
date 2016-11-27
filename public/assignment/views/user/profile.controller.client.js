(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$routeParams, UserService) {
        var vm = this;

        var userId = $routeParams['uid'];
        vm.id=userId;

        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        function init() {
            UserService
                .findUserById(vm.id)
                .then(function (user) {
                    vm.user = user.data;
                });
        }
        init();


        function updateUser(someuser) {
            UserService.updateUser(vm.user._id, someuser)
                .then(function (response) {
                    console.log(response.data);
                    vm.success = "Success";
                })
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){
                  console.log("Unable to delete user");
                });
        }
    }


})();