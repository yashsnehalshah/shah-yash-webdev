
module.exports = function(app) {

    var models = require("./server/models/models.server.js")();
    require("./server/services/user.service.server.js")(app,models);
    require("./server/services/favorite.service.server.js")(app,models);
    require("./server/services/review.service.server.js")(app,models);
    require("./server/services/following.service.server.js")(app,models);
};
