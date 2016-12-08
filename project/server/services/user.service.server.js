module.exports = function(app, models) {
    var userModel=models.userModel;



    app.get("/api/user", findUser);
    app.post("/api/user", createUser);

    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    //app.get("/api/user?username=username&password=password",xyz);
    //app.get("/api/user?username=username",findUserByUsername);
    app.delete("/api/user/:userId", unregisterUser);
    app.post("/api/user/logout", logout);
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

    function logout(req, res) {
        req.logout();
        res.send(200);
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

        console.error("In server findUser of project");
        var username=req.query.username;
        var password=req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,res);
        }
        else if(username){
            findUserByUsername(username,res);
        }

    else {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },function(error) {
                        res.status(400).send(error);
                    });
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
                console.log("In findUserByUsername of project");
                res.json(user);
                console.log(user.username);
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