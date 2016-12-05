var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");


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



    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/register",register);
    app.get("/api/loggedIn",loggedIn);
    app.post("/api/logout",logout);
    app.get("/auth/facebook",passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/assignment/#/user',
        failureRedirect: '/assignment/#/login'
    }));

    passport.use('wam',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook',new FacebookStrategy(facebookConfig,facebookLogin));
    //function xyz(username, password) {
      //  console.log("in xyz");
    //}

    function login(req,res) {
        var user=req.user;
        res.json(user);
    }


    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.status(400).send("Username already exists");
                        return;
                    } else {

                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body)
                    }
                },
                function (error) {
                    res.status(400).send(error);
                })
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function logout(req,res) {
        req.logOut();
        res.send(200);}


    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .findFacebookUser(profile.id)
            .then(function (facebookUser) {
                if (facebookUser) {
                    return done(null, facebookUser);
                }
                else {
                    facebookUser = {
                        username: profile.displayName.replace(/ /g, ' '),
                        facebook: {
                            token: token,
                            id: profile.id,
                            displayName: profile.displayName
                        }
                    }
                    userModel
                        .createUser(facebookUser)
                        .then(function (user) {
                            done(null, user);
                        })
                }
            })
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }


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