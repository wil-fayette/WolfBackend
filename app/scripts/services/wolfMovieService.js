'use strict';

angular.module('wolfTheatresBackendApp').factory('wolfMovieService', function ($http) {
    var wolfMovieService = {};
    wolfMovieService.getWolfMovies = function (callback) {
        $http.get(wolfApiUrl + 'api/Movie/GetMovies').success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.getMovieShowtimes = function (callback) {
        $http.get(wolfApiUrl + 'api/Movie/GetMovieShowtimes').success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.addNewMovie = function (movieDbId, callback) {
        $http.post(wolfApiUrl + 'api/Movie/AddNewMovie?movieDbId=' +  movieDbId).success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.deleteMovie = function (movieId, callback) {
        $http.delete(wolfApiUrl + 'api/Movie/DeleteMovie?movieId=' + movieId).success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.updateMovie = function (movie, callback) {
        $http.post(wolfApiUrl + 'api/Movie/UpdateMovie/', movie).success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.addMovieTrailer = function (trailer, callback) {
        $http.post(wolfApiUrl + 'api/Movie/AddMovieTrailer/', trailer).success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.deleteMoviePoster = function (posterId, callback) {
        $http.delete(wolfApiUrl + 'api/Movie/DeleteMoviePoster/?posterId=' + posterId).success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.deleteMovieTrailer = function (trailerId, callback) {
        $http.delete(wolfApiUrl + 'api/Movie/DeleteMovieTrailer?trailerId=' + trailerId).success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.deleteMovieShowtime = function (showtimeId, callback) {
        $http.delete(wolfApiUrl + 'api/Movie/DeleteMovieTrailer?trailerId=' + trailerId).success(function (data) {
            callback(data);
        });
    }

    wolfMovieService.saveMovieShowtimes = function (movieShowtimes, callback) {
        $http.post(wolfApiUrl + 'api/Movie/SaveMovieShowtimes/', movieShowtimes).success(function (data) {
            callback(data);
        });
    }

    return wolfMovieService;
});