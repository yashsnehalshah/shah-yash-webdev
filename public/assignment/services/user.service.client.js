(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var users = [
        {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]
    function UserService() {


        var api = {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername:findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function createUser(user) {
            users.push(user);
        }
        function findUserById(userId) {
            for(var u in users) {
                user = users[u];
                if(user._id === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username){
            for(var u in users) {
                user = users[u];
                if(    user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user){
            for(var u in users) {
                usr = users[u];
                if(    usr._id === userId) {
                    usr.firstName=user.firstName;
                    usr.lastName=user.lastName;
                    usr.username=user.username;
                    usr.password=user.password;
                }
            }
            return null;
        }

        function deleteUser(userId){
            for(var u in users) {
                user = users[u];
                if(user._id === userId){
                    users.splice(u,1);
                }
            }
            return null;
        }
    }
})();
