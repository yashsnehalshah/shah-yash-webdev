(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$routeParams, UserService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        vm.id=userId;

        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;

        function init() {
            UserService
                .findUserById(vm.id)
                .success(function(user){
                    vm.user=user;
                })
                .error(function(){
                 console.log("User not found");
                });
        }
        init();


        function updateUser(someuser){
            UserService.updateUser(vm.id,someuser);
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