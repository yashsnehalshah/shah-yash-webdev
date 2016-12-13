
(function() {
    angular
        .module("MyMovieApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl:"client/views/moviehome.view.client.html"
            })
            .when("/home",{
                templateUrl:"client/views/moviehome.view.client.html"
            })
            .when("/login", {
                templateUrl: "client/views/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "client/views/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "client/views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/movies", {
                templateUrl: "client/views/usermovie-list.view.client.html",
                controller: "UsermovieListController",
                controllerAs: "model"
            })

            .when("/user/:uid/searchmovies", {
                templateUrl: "client/views/searchhome.view.client.html",
                controller: "SearchhomeController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchmovies/:movietitle", {
                templateUrl: "client/views/searchhome.view.client.html",
                controller: "SearchhomeController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchmovies/:movieid/:movietitle", {
                templateUrl: "client/views/moviepage.view.client.html",
                controller: "MoviePageController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchmovies/:movieid/:movietitle/reviews", {
                templateUrl: "client/views/reviewsofamovie.view.client.html",
                controller: "ReviewsofamovieController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchmovies/:movieid/:movietitle/new", {
                templateUrl: "client/views/writereview.view.client.html",
                controller: "WritereviewController",
                controllerAs: "model"
            })
            .when("/user/:uid/followings", {
                templateUrl: "client/views/ownfollowings.view.client.html",
                controller: "FollowingController",
                controllerAs: "model"
            })
            .when("/user/:uid/favorites", {
                templateUrl: "client/views/ownfavorites.view.client.html",
                controller: "OwnfavoriteController",
                controllerAs: "model"
            })
            .when("/user/:uid/reviews", {
                templateUrl: "client/views/ownreviews.view.client.html",
                controller: "OwnreviewsController",
                controllerAs: "model"
            })
            .when("/user/:uid/reviews/review/:rid", {
                templateUrl: "client/views/reviewedit.view.client.html",
                controller: "EditreviewController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchusers", {
                templateUrl: "client/views/searchusers.view.client.html",
                controller: "SearchusersController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchusers/:oid", {
                templateUrl: "client/views/otheruserdetails.view.client.html",
                controller: "OtheruserdetailsController",
                controllerAs: "model"
            })
            .when("/user/admin/:uid", {
                templateUrl: "client/views/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",

            })


            .otherwise({
                redirectTo: "/login"
            });
    }
})();