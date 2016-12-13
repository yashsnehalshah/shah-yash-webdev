module.exports = function (app, models) {
    var reviewModel = models.reviewModel;

    var movieModel = models.movieModel;



    app.get("/api/project/movie/review/like/follow/:movieId", findMovie);

    app.delete("/api/review/remove/usersReview/:userId", deleteReviewByUserId);
    app.post("/api/user/:userId/review/:movieId", addReview);
    app.get("/api/user/user/:userId/movie/review/:movieId", getReviewByUserId);
    app.get("/api/userreview/user/:userId", findAllReviewsByUserId);
    app.get("/api/user/:movieId/reviews", findAllReviewsByMovieId);
    app.get("/api/user/:movieId/reviewstwo", findAllReviewsByMovieIdTwo);
    app.delete("/api/revuser/:reviewId", deleteReview);
    app.put("/api/user/review/:reviewId/movie/:reviewText", updateReview);
    app.get("/api/user/review/movie", getAllReviews);

    function findMovie(req, res) {
        movieModel
            .findMovieByMovieId(req.params.movieId)
            .then(
                function (mdata) {
                    res.json(mdata);
                }, function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function deleteReviewByUserId(req, res) {
        reviewModel
            .deleteReviewByUserId(req.params.userId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function getAllReviews(req, res) {
        reviewModel
            .getAllReviews()
            .then(
                function (mdata) {
                    res.json(mdata);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


    function getReviewByUserId(req, res) {
        reviewModel
            .getReviewByUserId(req.params.userId, req.params.movieId)
            .then(
                function (mdata) {
                    res.json(mdata);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            )
    }

    function updateReview(req, res) {
        reviewModel
            .updateReview(req.params.reviewId, req.params.reviewText)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }


    function deleteReview(req, res) {
        reviewModel
            .deleteReview(req.params.reviewId)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function addReview(req, res) {
        var userId = req.params.userId;
        //  var username = req.params.username;
        var movie = req.body;
        var movieId = movie.imdbId;

        var actualid = "";
        var tempmovie = {
            imdbId: movie.imdbId,
            name: movie.name,
            poster: movie.plot,
            director: movie.director,
            released: movie.released,
            plot: movie.plot,
            actors: movie.actors,
            runtime: movie.runtime,
            genre: movie.genre,
            country: movie.country,
            language: movie.language,
            imdbrating: movie.imdbrating,
            awards: movie.awards
        }
        movieModel
            .findMovie(movieId)
            .then(
                function (obmovie, error)   {

                        if (obmovie == null) {

                    movieModel
                        .addMovie(tempmovie)
                        .then(

                            function (objmovie) {
                                actualid = objmovie._id;
                                console.log(actualid);
                                var review = {
                                    _user: userId,
                                    _movie: actualid,
                                    reviewText: movie.reviewText,
                                    moviename:movie.name
                                };
                                reviewModel
                                    .addReview(review)
                                    .then(
                                        function (rob) {
                                            res.json(rob);
                                        }, function (err) {
                                            res.status(400).send(err);
                                        })})}

                                        else
                        {
                            actualid = obmovie._id;
                            console.log(actualid);
                            var review = {
                                _user: userId,
                                _movie: actualid,
                                reviewText: movie.reviewText,
                                moviename:movie.name
                            };

                            reviewModel
                                .addReview(review)
                                .then(
                                    function (rob) {
                                        res.json(rob);
                                    }, function (err) {
                                        res.status(400).send(err);
                                    }
                                );


                        }
                },
                function(error) {
                    res.status(400).send(err);
                });

    }


    function findAllReviewsByMovieId(req, res) {
        reviewModel
            .findAllReviewsByMovieId(req.params.movieId)
            .then(
                function (omdata) {
                    res.json(omdata);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }




    function findAllReviewsByMovieIdTwo(req, res) {
        reviewModel
            .findAllReviewsByMovieId(req.params.movieId)
            .then(
                function (omdata) {
                    res.json(omdata);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllReviewsByUserId(req, res) {
        reviewModel
            .findAllReviewsByUserId(req.params.userId)
            .then( function (omdata) {
                    res.json(omdata);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }


}

