module.exports=function () {

    var mongoose=require("mongoose");
    var UserSchema=require("./user.schema.server.js")();
    var User=mongoose.model("User",UserSchema);

    var api={

        createUser:createUser,
        findUserById:findUserById,
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        deleteUser:deleteUser,
        updateUser:updateUser
    };
    return api;


    function createUser(user) {
        console.log("In mongodb");
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username,password) {
        return User.findOne({username:username,password:password});

    }

    function findUserByUsername(username) {
        return User.findOne({username:username});

    }
    function deleteUser(userId) {
        return User.remove({_id:userId});
    }

    function updateUser(userId,newUser) {
        return User.update({_id:userId},{
                $set: {
                    firstName:newUser.firstName,
                    lastName:newUser.lastName,
                    email:newUser.email
                }
            });
    }
}