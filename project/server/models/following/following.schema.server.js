module.exports=function () {
    var mongoose=require("mongoose");

    var FollowingSchema= mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId,ref: "User"},
        _userFollowing: {type: mongoose.Schema.ObjectId,ref: "User"}
    },{collection:"project.following"});

    return FollowingSchema;
};