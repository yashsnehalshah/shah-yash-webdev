(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService){

        var vm = this;
        vm.createUser = createUser;

        function createUser(username,password,vpassword) {
            UserService.findUserByUsername(username)
                .then(function (res) {
                    var checkifalreadyexist = res.data;

                    if (checkifalreadyexist) {
                        vm.error = "Username already exists";
                    }
                    else {
                        if (password === vpassword) {
                            var user = {
                                _id: (new Date).getTime(),
                                username: username,
                                password: password,
                                firstName: username,
                                lastName: username
                            };

                            UserService.createUser(user)
                                .success(function () {
                                    $location.url("/user/" + user._id);
                                })
                                .error(function () {
                                    $location.url("/login");
                                })

                        }
                        else {
                            vm.error = "Passwords do not match";
                        }
                    }
                })
        }

    }

})();