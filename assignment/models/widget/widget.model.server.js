module.exports=function () {
    var mongoose=require("mongoose");
    var WidgetSchema=require("./widget.schema.server")();
    var Widget=mongoose.model("Widget",WidgetSchema);

    var api={
        createWidget:createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget: reorderWidget
    }
    return api;


    function createWidget(widget) {
        return Widget.find({_page: widget._page})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return error;
                });
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({_page:pageId});
    }

    function findWidgetById(wgid){
        return Widget.findById(wgid);
    }

    function updateWidget(type,widget){
        if(widget.type==="HEADER") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text:widget.text,
                        size:widget.size,
                        name:widget.name
                    }
                })
        }
        else if(widget.type==="HTML") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text:widget.text
                    }
                })
        }

        else if(widget.type==="IMAGE") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }

        else if(widget.type==="YOUTUBE") {
            return Widget
                .update({_id:widget._id},{
                    $set:{
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                    }
                })
        }



    }

    function deleteWidget(wgid){
        return Widget.remove({_id:wgid})
    }

    function reorderWidget(start, end, pageId) {
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                widgets.forEach(function (widget) {
                    if(start< end){

                        if(widget.order === start){
                            widget.order = end;
                            widget.save();
                        }
                        else if(widget.order > start && widget.order <= end){
                            widget.order--;

                            widget.save();

                        }
                    } else{
                        if(widget.order === start){

                            widget.order = end;
                            widget.save();

                        }

                        else if(widget.order < start && widget.order >= end){

                            widget.order++;

                            widget.save();

                        }
                    }
                })
            });
    }


};