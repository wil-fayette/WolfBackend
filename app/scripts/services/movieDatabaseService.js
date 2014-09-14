'use strict';

angular.module('wolfTheatresBackendApp').factory('movieDatabaseService', function ($http) {
    var movieDatabaseService = {};

    movieDatabaseService.search = function (query, callback) {
        $http.get(wolfApiUrl + 'api/TheMovieDatabase/Search?query=' +  query).success(function (data) {
            callback(data);
        });
    };

    movieDatabaseService.getDetails = function (movieId, callback) {
        $http.get(wolfApiUrl + 'api/theMovieDatabase/GetMovieDetails?movieId=' + movieId).success(function (data) {
            callback(data);
        });
    };

    movieDatabaseService.getUpcomingMovies = function (callback) {
        $http.get(wolfApiUrl + 'api/theMovieDatabase/GetUpcomingMovies').success(function (data) {
            callback(data);
        });
    };

    return movieDatabaseService;
});