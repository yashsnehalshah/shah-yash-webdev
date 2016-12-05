(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;


        vm.login=function (username,password) {
            console.log(username + " : " + password);
            UserService
                .login(username,password)
                .then(function(response) {
                    var user=response.data;
                    $location.url("/user/"+user._id);
                },function (error) {
                    vm.error="User not found";
                });


        }
    }

})();