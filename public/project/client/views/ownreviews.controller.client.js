(function () {
    angular
        .module("MyMovieApp")
        .controller("OwnreviewsController", OwnreviewsController);

    function OwnreviewsController(ReviewService, MovieService, $routeParams, $location) {
        var vm = this;
        vm.imdbId = $routeParams['movieid'];
        vm.title = $routeParams['movietitle'];
        vm.userId=$routeParams['uid'];
        vm.deleteReview=deleteReview;
        function init() {
            ReviewService
                .findAllReviewsByUserId(vm.userId)
                .then(function (resp) {
                    vm.reviews=resp.data;
                },function (error) {
                    vm.error="No reviews found";
                })
        }
        init();

        function deleteReview(rev){
            ReviewService
                .deleteReview(rev)
                .then(
                    function (response) {
                        console.log("Review removed");
                        console.log(response.data);
                    },
                    function (error) {
                        console.log("error");
                    })



        }


    }
})();