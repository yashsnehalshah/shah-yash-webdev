(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService){

        var vm = this;
        vm.createUser = createUser;

        function createUser(username,password,vpassword)
        {
         var findSameUsername=UserService.findUserByUsername(username);
         if(findSameUsername !== null){
             vm.error = "Username already exists";
         }
         else{
             if(password===vpassword)
             {
                 var user={
                     _id:(new Date).getTime()+"",
                     username:username,
                     password:password,
                     firstName: "",
                     LastName: ""
                 };

                 UserService.createUser(user);
                 var flag=true;

                 if(flag)
                 {
                     $location.url("/user/"+user._id);
                 }
                 else{
                     $location.url("/login");
                 }
             }
             else{
                 vm.error = "Passwords do not match";
             }
         }
        }

    }

})();