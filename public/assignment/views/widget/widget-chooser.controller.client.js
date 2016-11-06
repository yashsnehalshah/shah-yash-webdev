(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController)

    function WidgetChooserController($location,$routeParams,WidgetService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId=parseInt($routeParams['wid']);
        var pageId=parseInt($routeParams['pid']);
        vm.id=userId;
        vm.websiteId=websiteId;
        vm.pageId=pageId;
        vm.createWidget = createWidget;


        function createWidget(widgettype) {
            if (widgettype === "HEADER") {
                var newWidget = {
                    _id: (new Date()).getTime(),
                    widgetType: "HEADER",
                    pageId: vm.pageId,
                    size: 2,
                    text: "Default"
                };
            }
            else if (widgettype === "IMAGE") {
                var newWidget = {
                    _id: (new Date()).getTime(),
                    widgetType: "IMAGE",
                    pageId: vm.pageId,
                    width: "100%",
                    url: "http://lorempixel.com/400/200/"
                };
            }
            else if (widgettype === "YOUTUBE") {
                var newWidget = {
                    _id: (new Date()).getTime(),
                    widgetType: "YOUTUBE",
                    pageId: vm.pageId,
                    width: "100%",
                    url: "http://lorempixel.com/400/200/"
                };
            }
            else if (widgettype === "HTML") {
                var newWidget = {
                    _id: (new Date()).getTime(),
                    widgetType: "HTML",
                    pageId: vm.pageId,
                    text: "<p>Lorem ipsum</p>"
                };
            }

            WidgetService.createWidget(vm.pageId,newWidget)
                .then(function (res) {
                    var result=res.data;
                    if(result){
                        var widgetId=newWidget._id;
                        vm.widgetId=widgetId;
                        $location.url("/user/"+vm.id+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                    }
                    else{
                        console.log("unable to update widget");
                    }
                })

        }


        }

        })();