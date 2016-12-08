(function() {
    angular
        .module("MyMovieApp")
        .controller("WritereviewController", WritereviewController)


    function WritereviewController($location,$routeParams,ReviewService,MovieService){
        var vm=this;
        var userId = $routeParams['uid'];
        var movieId=$routeParams['movieid'];
        var movietitle=$routeParams['movietitle'];
        vm.id=userId;
        vm.imdbId=movieId;
        vm.movietitle=movietitle;
        vm.createReview=createReview;


        function init() {
            ReviewService.findAllReviewsByMovieId(vm.imdbId)
                .then(function (res) {
                    vm.reviews = res.data;
                })

            MovieService
                .searchMovieByImdbID(vm.imdbId)
                .then(
                    function (response) {
                        vm.movie = response.data;


                    })
        }
        init();

        function createReview(review)
        {

            if (review) {
                var movieReview = {
                    imdbId: vm.movie.imdbID,
                    name: vm.movie.Title,
                    poster: vm.movie.Poster,
                    director: vm.movie.Director,
                    released: vm.movie.Released,
                    plot: vm.movie.Plot,
                    actors: vm.movie.Actors,
                    runtime: vm.movie.Runtime,
                    genre: vm.movie.Genre,
                    country: vm.movie.Country,
                    language: vm.movie.Language,
                    imdbrating: vm.movie.imdbRating,
                    reviewText: vm.review.text,
                    moviename:vm.movie.Title,
                    awards: vm.movie.Awards

                };
                console.log(movieReview);
                ReviewService
                    .addReview(vm.id, vm.imdbId, movieReview)
                    .then(
                        function (response) {
                            console.log("review added successfully");
                            console.log(response.data);
                            alert("review was successfully submitted");
                            //$location.url("/user/" + vm.userId + "/restaurant/" +  vm.yelpRestId + "/reviews");
                        }, function (error) {
                            vm.error = "some error ocurred";
                        }
                    )
            }
            else {
                vm.error = "Review text cannot be empty";
            }
        }

    }

})();