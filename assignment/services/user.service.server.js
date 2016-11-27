module.exports = function(app, models) {
var userModel=models.userModel;

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
        userModel.deleteUser(uid)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.statusCode(404).send(error);
            })
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.userId;
        userModel.updateUser(uid, user)
            .then(function (status) {
                res.send(200);
            }, function (error) {
                res.statusCode(404).send(error);
            })
    }

    function createUser(req, res) {
        console.log("In server createUser")
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.statusCode(400).send(error);
            })
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
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findUserByUsername(username,res) {
        userModel.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.statusCode(404).send(error);
            })
    }



        function findUserById(req,res) {
            var id=req.params.userId;
            userModel.findUserById(id)
                .then(function (user) {
                    res.send(user);
                },function (error) {
                    res.statusCode(404).send(error);
                })
        }

};