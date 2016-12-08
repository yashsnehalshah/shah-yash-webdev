(function () {
    angular
        .module("MyMovieApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService, ReviewService, $location, $routeParams) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.deleteUser = deleteUser;
        vm.deleteReview = deleteReview;
        vm.logout = logout;


        function init() {


            UserService
                .findUsers()
                .then(function (response) {

                    if (response.data != null) {
                        vm.allUsers = response.data;

                    }
                    else {
                        console.log("error");
                    }
                });
            ReviewService
                .getAllReviews()
                .then(function (response) {

                    if (response.data != null) {
                        vm.allReviews = response.data;

                    }
                    else {
                        console.log("error");
                    }
                });






        }

        init();


        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(
                    function (response) {
                        vm.success = "User was successfully deleted";
                    });
        }


        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(
                    function (response) {
                        vm.success = "Review was successfully deleted";
                    });

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }






    }
        })();
