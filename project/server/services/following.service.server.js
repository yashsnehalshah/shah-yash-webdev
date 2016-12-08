module.exports = function (app, models) {

    var followingModel = models.followingModel;

    app.get("/api/user/follow/:userId/check/:oid", findFollowing);
    app.post("/api/user/:userId/addfollowing/:oid", addFollowing);
    app.get("/api/user/:userId/following", findAllFollowedByUserId);
    app.delete("/api/user/:userId/unfollow/:oid", unfollowUser);
    app.delete("/api/unfollowedBy/user/:userId", deleteFollowedBy);
    app.delete("/api/unfollowing/:userId/deleteUser", deleteFollowing);


    function deleteFollowedBy(req, res) {
        followingModel
            .deleteFollowedBy(req.params.userId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function unfollowUser(req, res) {
        followingModel.unFollow(req.params.userId, req.params.oid)
            .then(
                function (ufo) {
                    res.json(ufo);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findFollowing(req, res) {
        followingModel
            .findFollowing(req.params.userId, req.params.oid)
            .then(
                function (checkFollowObj) {
                    res.json(checkFollowObj);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function deleteFollowing(req, res) {
        followingModel
            .deleteFollowing(req.params.userId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }





    function addFollowing(req, res) {
        var following = {
            _user: req.params.userId,
            _userFollowing: req.params.oid
        }
        followingModel
            .findFollowing(req.params.userId, req.params.oid)
            .then(
                function (fob) {
                    if(fob == null){
                        followingModel
                            .addFollowing(following)
                            .then(
                                function (nfob) {
                                    res.json(nfob);
                                },
                                function (error) {
                                    res.statusCode(400).send(error);
                                }
                            );
                    }
                    else{
                        res.json(fob);
                    }
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllFollowedByUserId(req, res) {
        followingModel.findAllFollowingByUserId(req.params.userId)
            .then(
                function (fob) {
                    res.json(fob);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }




};