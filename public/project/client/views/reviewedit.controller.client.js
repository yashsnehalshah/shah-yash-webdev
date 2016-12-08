(function() {
    angular
        .module("MyMovieApp")
        .controller("EditreviewController", EditreviewController)


    function EditreviewController($location,$routeParams,ReviewService,MovieService){
        var vm=this;
        var userId = $routeParams['uid'];
        var movieId=$routeParams['movieid'];
        var movietitle=$routeParams['movietitle'];
        var reviewId=$routeParams['rid'];
        vm.id=userId;
        vm.imdbId=movieId;
        vm.movietitle=movietitle;
        vm.updateReview=updateReview;
        vm.reviewId=reviewId;

        function init() {

            ReviewService.getReviewByUserId(vm.id, vm.movie._id)
                .then(function (res) {
                    vm.review = res.data;
                })


        }
        init();

function updateReview(review) {



}

    }

})();