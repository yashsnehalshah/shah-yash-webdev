
module.exports = function () {
/*
    var mongoose = require('mongoose');
   mongoose.connect('mongodb://localhost/test');
*/
    var mongoose = require('mongoose');
    mongoose.createConnection('mongodb://localhost/wam-fall-2016');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();


    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel:pageModel,
        widgetModel:widgetModel
    };

    /*websiteModel.setModel(models);
    userModel.setModel(models);
    pageModel.setModel(models);
    widgetModel.setModel(models);
*/
    return models;
}
