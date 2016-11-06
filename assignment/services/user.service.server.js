module.exports = function(app) {

    var users = [
     {_id: 123, username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
     {_id: 234, username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
     {_id: 345, username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
     {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
     ];


    app.get("/api/user", findUser);
    app.post("/api/user", createUser);

    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    //app.get("/api/user?username=username&password=password",xyz);
    //app.get("/api/user?username=username",findUserByUsername);
    app.delete("/api/user/:userId", unregisterUser);
    console.log("yash1");

    //function xyz(username, password) {
      //  console.log("in xyz");
    //}
    function unregisterUser(req, res) {
        var uid = req.params.userId;
        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u, 1);
                return true;
            }
        }
        return false;
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.userId;
        for(var u in users){
            if(users[u]._id===uid){
                users[u].firstName=user.firstName;
                users[u].lastName=user.lastName;
                users[u].username=user.username;
                res.send(user);
                return;
            }
        }
        res.send(null);
        return;
    }


    function createUser(req, res) {
        var user = req.body;
        //user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function findUser(req, res) {

        console.error("In server findUser");
        var username=req.query.username;
        var password=req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,res);
        }
        else if(username){
            findUserByUsername(username,res);
        }
        else {
            res.send(users);
        }
    }


    function findUserByCredentials(username,password,res) {
        for(var i in users){
            if(users[i].username == username && users[i].password == password){

                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }

    function findUserByUsername(username,res) {
        for(var i in users){
            if(users[i].username==username){
                res.send(users[i]);
                return;
            }
        }
        res.send(null);
    }



        function findUserById(req,res) {
            var id=parseInt(req.params.userId);
            for(var i in users){
                if(users[i]._id===id){
                    res.send(users[i]);
                    return;
                }
            }
            res.send(null);
        }

};