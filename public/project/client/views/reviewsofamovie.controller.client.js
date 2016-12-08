(function () {
    angular
        .module("MyMovieApp")
        .controller("ReviewsofamovieController", ReviewsofamovieController);

    function ReviewsofamovieController(ReviewService, UserService, MovieService, FavoriteService, $routeParams, $location) {
        var vm = this;
        vm.imdbId = $routeParams['movieid'];
        vm.title = $routeParams['movietitle'];
        vm.userId=$routeParams['uid'];
        console.log(vm.imdbId);
        function init() {
            FavoriteService
                .findMovie(vm.imdbId)
                .then(
                    function (response) {

                            vm.movie = response.data;

                        ReviewService
                            .findAllReviewsByMovieIdTwo(vm.movie._id)
                            .then(function (resp) {
                                vm.reviews=resp.data;
                            },function (error) {
                                vm.error="No reviews found";
                            })
                        })


        }
        init();


    }
})();