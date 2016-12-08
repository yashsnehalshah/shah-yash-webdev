(function(){
    angular
        .module("MyMovieApp")
        .factory("UserService", UserService);

    /*var users = [
     {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
     {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
     {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
     {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
     ]*/
    function UserService($http) {


        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser,
            logout:logout,
            findUsers:findUsers
        }
        return api;

        function createUser(user) {
            var url="/api/user";
            return $http.post(url,user);
        }



        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            console.log("in findUserByCredentials");
            var url = "/api/user?username="+username+"&password="+password;

            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function updateUser(userId, user){
            var url = "/api/user/" + user._id;
            return $http.put(url, user);
        }

        function deleteUser(userId){
            var url="/api/user/" + userId;
            return $http.delete(url);
        }

        function logout() {
            return $http.post("/api/user/logout");
        }

        function findUsers() {
            var url = "/api/user/";
            return $http.get(url);
        }
    }
})();
