(function() {
    angular
        .module("MyMovieApp")
        .controller("MoviePageController", MoviePageController);

    function MoviePageController($routeParams, MovieService, FavoriteService) {
        var vm = this;
        vm.imdbId = $routeParams['movieid'];
        vm.title = $routeParams['movietitle'];
        vm.userId=$routeParams['uid'];
        console.log("Hello from Details Controller: " + vm.imdbId);
        //vm.movieId=imdbID;

        vm.addtofavorite=addtofavorite;

        function init() {
            MovieService
                .searchMovieByImdbID(vm.imdbId)
                .success(function(response){
                    vm.movie = response;
                });
        }
        init();


        function addtofavorite(userd,somemovie)
        {
            FavoriteService
                .favoriteMovie(userd,somemovie)
                .success(function (response){
                    console.log("successfully added movie to favorite");
                })
        }
    }
})();