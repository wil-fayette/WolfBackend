'use strict';


angular.module('wolfTheatresBackendApp').controller('MovieInformationController', function ($scope, $filter, $http, $timeout, $rootScope, wolfMovieService, $sce, $modal, movieDatabaseService) {
    var apiKey = 'pup7g2wafuxya22ryzfvyung';
    $scope.wolfMovies = [];
    $scope.searchResults = [];
    $scope.alerts = [];
    $scope.showMovieSearchDiv = true;
    $scope.showOurMoviesDiv = true;
    $scope.showMovieInformationDiv = true;
    $scope.movieTrailerUrl = '';
    $scope.selectedTrailer = true;
    $scope.selectedPoster = true;
    $scope.copyDate = '';
    $scope.paste = '';
    $scope.addMovieDisabled = false;
    $scope.deleteMovieDisabled = false;

    function removeMovieById(id, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].MovieId === id) {
                array.splice(i, 1);
            }
        }
    }

    function addNewMovie(movie) {
        var inArray = false;

        for (var i = 0; i < $scope.wolfMovies.length; i++) {
            if ($scope.wolfMovies[i].MovieDbId === movie.MovieDbId) {
                inArray = true;
            }
        }

        if (!inArray) {
            var indexOfMovie = $scope.searchResults.indexOf(movie);
            if (indexOfMovie !== -1) {
                $scope.searchResults.splice(indexOfMovie, 1);
            }
            $scope.addMovieDisabled = true;
            wolfMovieService.addNewMovie(movie.MovieDbId, function (returnedMovie) {
                $scope.addMovieDisabled = false;
                $scope.wolfMovies.push(returnedMovie);
            });
        }
    }

    function selectMovie(movie) {
        console.log(movie);
        if ($scope.selectedMovie === movie) {
            $scope.selectedMovie = null;
        } else {
            $scope.selectedMovie = movie;
        }
    }

    $scope.selectMovie = selectMovie;
    $scope.addNewMovie = addNewMovie;
    $scope.date = new Date();

    wolfMovieService.getWolfMovies(function (data) {
        debugger;
        $scope.wolfMovies = data;
    });

    function deleteMovie(movieId) {
        removeMovieById(movieId, $scope.wolfMovies);
        $scope.deleteMovieDisabled = true;
        wolfMovieService.deleteMovie(movieId, function (data) {
            $scope.deleteMovieDisabled = false;
        });
    }

    $scope.editMovie = function (movie) {
        var modalInstance = $modal.open({
            templateUrl: 'editMovieModal.html',
            controller: ModalInstanceCtrl,
            size: 'lg',
            resolve: {
                object: function () {
                    return movie;
                }
            }
        });
    };

    $scope.movieDatabaseSearch = function movieDatabaseSearch(query) {
        movieDatabaseService.search(query, function (movies) {
            $scope.searchResults = movies;
        });
    }
    $scope.deleteMovie = deleteMovie;
});

var ModalInstanceCtrl = function ($scope, wolfMovieService, $modalInstance, object, $sce) {
    $scope.movieTrailerUrl = '';


    $scope.uploadPoster = function uploadPoster(poster, movie) {
        if ($('#' + poster).get(0) != null) {
            var files = $('#' + poster).get(0).files;

            if (files.length > 0) {
                if (window.FormData !== undefined) {
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append('file' + i, files[i]);
                    }

                    data.append('movieId', movie.MovieId);

                    $.ajax({
                        type: "POST",
                        url: wolfApiUrl + 'api/Poster/Post',
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (results) {
                            for (var i = 0; i < results.length; i++) {
                                $scope.object.Posters.push(results[i]);

                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                        }
                    });
                } else {
                    alert('This browser doesn\'t support HTML5 multiple file uploads!');
                }
            }
        }
    }

    $scope.addTrailer = function (movie, trailerUrl) {
        var trailer = {
            MovieId: movie.MovieId,
            TrailerUrl: trailerUrl
        };

        wolfMovieService.addMovieTrailer(trailer, function (trailer) {
            if (trailer != "null") {
                $scope.object.Trailers.push(trailer);
            }
        });
    }

    $scope.deleteTrailer = function deleteTrailer(trailer) {
        wolfMovieService.deleteMovieTrailer(trailer.TrailerId, function (data) {
            if (data == 1) {
                var index = $scope.object.Trailers.indexOf(trailer);
                $scope.object.Trailers.splice(index, 1);

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        });
    }

    $scope.deletePoster = function deletePoster(poster) {
        debugger;
        wolfMovieService.deleteMoviePoster(poster.PosterId, function (data) {
            if (data == 1) {
                var index = $scope.object.Posters.indexOf(poster);
                $scope.object.Posters.splice(index, 1);

                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }
        });
    }

    $scope.clearMovieTrailerUrl = function () {
        $scope.movieTrailerUrl = '';
    }

    $scope.trustSrc = function (src) {
        if (src) {
            return $sce.trustAsResourceUrl(src);
        }
    }

    $scope.backup = {};
    $scope.backup = angular.copy(object);

    $scope.object = object;
 
    $scope.save = function updateMovie(movie) {
        wolfMovieService.updateMovie(movie, function (returnedMovie) {
        
            $scope.object = returnedMovie;

            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $modalInstance.dismiss('cancel');
        });
    }

    $scope.undo = function () {
        angular.copy($scope.backup, $scope.object);
    }

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};