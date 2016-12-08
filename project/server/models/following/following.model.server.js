module.exports=function () {

    var mongoose=require("mongoose");
    var FollowingSchema=require("./following.schema.server.js")();
    var Following=mongoose.model("Following",FollowingSchema);



    var api={

     findFollowing:findFollowing,
     addFollowing:addFollowing,
     findAllFollowingByUserId:findAllFollowingByUserId,
     unFollow:unFollow,
     deleteFollowing:deleteFollowing

    };
return api;

    function findFollowing(userId, followingId){
        return Following.findOne({"_user": userId, "_userFollowing": followingId});

    }

    function addFollowing(following){
        return Following.create(following);
    }


    function findAllFollowingByUserId(userId) {
        return Following.find({_user: userId})
            .populate('_userFollowing', '_id username');
    }


       function unFollow(userId,followingId){

           return Following.remove({"_user": userId, "_userFollowing": followingId});
       }


       function deleteFollowing(userId){
           return Following.remove({"_user" : userId});

       }

}