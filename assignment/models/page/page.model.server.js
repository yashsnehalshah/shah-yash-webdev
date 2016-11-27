module.exports=function () {
    var mongoose=require("mongoose")
    var PageSchema=require("./page.schema.server.js")();
    var Page=mongoose.model("Page",PageSchema);

    var api={
        createPage:createPage,
        findAllPagesForWebsite:findAllPagesForWebsite,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage
    }
    return api;

    function createPage(page) {
        return Page.create(page);
    }
    function findAllPagesForWebsite(websiteId){
        return Page.find({_website:websiteId});
    }

    function findPageById(pid){
        return Page.findById(pid);
    }
    function updatePage(page,pid){
        return Page.update({_id:pid},{
                $set:{
                    name:page.name,
                    title:page.title
                }
            })
    }
    function deletePage(pid){
        return Page.remove({_id:pid});
    }

};