(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        vm.id=userId;

        var user = UserService.findUserById(userId);
        vm.user;
        if(user != null) {
            vm.user = user;
        }

        vm.updateUser=updateUser;

        function updateUser(someuser){
            UserService.updateUser(vm.userId,someuser);

            vm.success="User successfully updated";
        }
    }
})();