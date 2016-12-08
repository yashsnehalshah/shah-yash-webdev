(function () {
    angular
        .module("MyMovieApp")
        .factory("ReviewService", ReviewService );

    /*function ReviewService($http) {


        var api = {
            createReview: createReview,
            findReviewByMovieId: findReviewByMovieId,
            findAllReviewsByUserId: findAllReviewsByUserId,  //for user central
            deleteReview: deleteReview,
            updateReview: updateReview,
            findReviewById: findReviewById,
            getAllReviews : getAllReviews,   //for admin
            deleteReviewByUserId : deleteReviewByUserId   //for admin


        };

        return api;
*/
        /*function findRestaurant(restaurantId) {
            return $http.get("/api/project/restaurant/review/like/follow/" + restaurantId);
        }
*/
        /*function deleteReviewByUserId(userId) {
            return $http.delete("/api/review/remove/usersReview/" + userId);
        }

        function getAllReviews() {
            return $http.get("/api/user/review/movie");
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/user/user/" + userId);
        }

        function createReview(userId,movieId,title,description){
            var areview = {
                _user:userId,
                _movie:movieId,
                title:title,
                description:description
            };
            var url="/api/movie/"+movieId+"/review";
            return $http.post(url,areview);
        }

        function findReviewByMovieId(movieId){
            var url= "/api/movie/"+movieId+"/review";
            return $http.get(url);
        }

        function findReviewById(reviewId){
            var url="/api/review/"+reviewId;
            return $http.get(url);
        }

        function updateReview(reviewId, title, description){
            var review={
                _id:reviewId,
                title:title,
                description:description
            };
            var url="/api/review/"+reviewId;
            return $http.put(url,review);
        }

        function deleteReview(reviewId){
            var url="/api/review/"+reviewId;
            return $http.delete(url);
        }
    }
})();
*/

    function ReviewService($http) {


        var api = {
            addReview: addReview,
            findAllReviewsByMovieId: findAllReviewsByMovieId,
            findAllReviewsByMovieIdTwo: findAllReviewsByMovieIdTwo,
            findAllReviewsByUserId: findAllReviewsByUserId,
            deleteReview: deleteReview,
            updateReview: updateReview,
            getReviewByUserId: getReviewByUserId,
            getAllReviews : getAllReviews,
            deleteReviewByUserId : deleteReviewByUserId,
            findMovie: findMovie

        };

        return api;

        function findMovie(movieId) {
            return $http.get("/api/project/movie/review/like/follow/" + movieId);
        }

        function deleteReviewByUserId(userId) {
            return $http.delete("/api/review/remove/usersReview/" + userId);
        }

        function getAllReviews() {
            return $http.get("/api/user/review/movie");
        }

        function getReviewByUserId(userId, movieId){
            return $http.get("/api/user/user/" + userId + "/movie/review/" + movieId);
        }

        function addReview(userId, movieId, movie) {
            return $http.post("/api/user/" + userId + "/review/" + movieId, movie);
        }

        function findAllReviewsByMovieId(movieId) {
            return $http.get("/api/user/" + movieId + "/reviews");
        }

        function findAllReviewsByMovieIdTwo(movieId) {
            return $http.get("/api/user/" + movieId + "/reviewstwo");
        }

        function findAllReviewsByUserId(userId) {
            return $http.get("/api/userreview/user/" + userId);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/revuser/" + reviewId);
        }

        function updateReview(reviewId, reviewText) {
            return $http.put("/api/user/review/" + reviewId + "/movie/" + reviewText);
        }
    }

})();