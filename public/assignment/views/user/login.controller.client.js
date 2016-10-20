(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        vm.user;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user === null) {
                vm.error = "No such user";
            } else {
                vm.user=user;
                $location.url("/user/" + user._id);
            }
        }
    }
})();