(function () {
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {

        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;
            element.sortable({
                axis: 'y',
                start: function (event, ui) {
                    start = $(ui.item).index();
                },
                stop: function (event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort(start, end);
                }
            });
        }

        return{
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end) {
            WidgetService.sort(start, end);
        }

    }
})();