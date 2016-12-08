(function(){
    angular
        .module("MyMovieApp")
        .controller("MoviereviewsController",MoviereviewsController);


    function MoviereviewsController($location, $routeParams, ReviewService, $rootScope) {

        var vm = this;
        vm.searchReviews = searchReviews;
        vm.userId=$routeParams.uid;
        vm.movieId=$routeParams.imdbId;

        function searchReviews(searchText) {
            ReviewService
                .findAllReviewsByMovieId(movieId)
                .then(function (response) {
                        vm.moviereviews = response.data;


                    },
                    function (error) {
                        vm.error = "No reviews found!";
                    });
        }


    }
})();