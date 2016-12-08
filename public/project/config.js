/*
(function() {
    angular
        .module("MyMovieApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "client/views/moviehome.view.client.html",
                controller: "HomeController",
                controllerAs: "model"

            })
            .when("/user/:uid", {
                templateUrl: "client/views/searchhome.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/temp", {
                templateUrl: "client/views/searchhome.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            })
            .when("/search", {
                templateUrl: "client/views/searchusers.view.client.html",

            })
            .when("/moviepage/:imdbID/:title", {
                templateUrl: "client/views/moviepage.view.client.html",
                controller: "MoviePageController",
                controllerAs: "model"
            })
    .when("/login", {
            templateUrl: "client/views/login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
        })
            .when("/moviepage/:imdbID/:title/review/new", {
                templateUrl: "client/views/writereview.view.client.html",
                controller:"WritereviewController",
                controllerAs:"model"
            });
    }
})();
*/


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

            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller:"WidgetListController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller:"WidgetChooserController",
                controllerAs:"model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller:"EditWidgetController",
                controllerAs:"model"
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
})();