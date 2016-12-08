(function () {
    angular
        .module("MyMovieApp")
        .controller("SearchhomeController", SearchhomeController);

    function SearchhomeController(MovieService, $routeParams, $location) {
        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;
        vm.title = $routeParams.title;
        vm.userId=$routeParams['uid'];

        function init() {
            if(vm.title) {
                // $location.path("#/search/"+title);
                searchMovieByTitle(vm.title);
            }
        }
        init();

        function searchMovieByTitle(title) {
            MovieService
                .searchMovieByTitle(title)
                .success(function (result) {
                    vm.movies = result.Search;
                })
                .error(function (error) {
                   vm.error="Movie not found";
                });
        }
    }
    })();