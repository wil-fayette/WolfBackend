'use strict';


angular.module('wolfTheatresBackendApp').controller('MovieScheduleController', function ($scope, $filter, $http, $route, $timeout, $rootScope, wolfMovieService, $sce, $modal, movieDatabaseService) {
    $scope.wolfMovies = [];
    $scope.showOurMoviesDiv = true;
    $scope.showCalendarDiv = true;
    $scope.dt = "";
    $scope.moviesPlayingOnSelectedDate = [];
    $scope.dates = [];
    $scope.copyDate;
    $scope.copy = false;
    $scope.showtimeDates = {};
    $scope.selectedDate;
    $scope.showDate;
    $scope.copyDate = '';
    $scope.expand = false;
    $scope.publish = true;

    $scope.jqueryScrollbarOptions = {
        'type': 'simple'
    };

    $scope.deleteShowtime = function (key, showtime) {
        for (var i = 0; i < $scope.showtimeDates[key].length; i++) {
            if ($scope.showtimeDates[key][i] == showtime) {
                $scope.showtimeDates[key].splice(i, 1);
            }
        }

        if ($scope.showtimeDates[key].length == 0) {
            $scope.deleteShowtimeDate(key);
        }
    }

    $scope.deleteShowtimeDate = function (key) {
        delete $scope.showtimeDates[key];
    }

    wolfMovieService.getMovieShowtimes(function (data) {
        for (var i = 0; i < data.length; i++) {
            addToShowtimeDates(data[i]);
        }
    });

    $scope.publish = function () {
        var movies = [];
        for (var showtimeDate in $scope.showtimeDates) {

            var showtimeDate = $scope.showtimeDates[showtimeDate];

            for (var i = 0; i < showtimeDate.length; i++) {
                movies.push(showtimeDate[i]);
            }
        }
        wolfMovieService.saveMovieShowtimes(movies, function (data) {
            $route.reload();
        });
    }

    function addToShowtimeDates(movieShowtime) {

        if (!$scope.showtimeDates.hasOwnProperty(movieShowtime.ScheduleDate))
            $scope.showtimeDates[movieShowtime.ScheduleDate] = [];

        $scope.showtimeDates[movieShowtime.ScheduleDate].push(movieShowtime);
    }

    $scope.pasteShowtimes = function (key) {
        if ($scope.showtimeDates.hasOwnProperty(key) && $scope.showtimeDates.hasOwnProperty($scope.copyDate)) {
            var copy = [];
            var toCopy = $scope.showtimeDates[$scope.copyDate];

            for (var i = 0; i < toCopy.length; i++) {
                copy.push({ MovieId: toCopy[i].MovieId, MovieShowtimeId: "", ScheduleDate: key, Showtimes: toCopy[i].Showtimes, MovieName: toCopy[i].MovieName });
            }

            $scope.showtimeDates[key] = copy;
        }
    }


    $scope.filterByDate = function (movieShowtime) {
        var result = movieShowtime.ScheduleDate == $filter('date')($scope.dt, 'yyyy-MM-dd');
        return result;
    };

    $scope.setDate = function (date) {
        if ($scope.dt != date) {
            $scope.dt = date;
            return;
        }

        $scope.dt = "";
    }

    $scope.showPaste = function (key) {

        if ($scope.copyDate != key && $scope.copyDate != '') {
            return true;
        }

        return false;
    }

    $scope.expand = function (bool) {
        var i = 0;
        for (var property in $scope.showtimeDates) {
            debugger;
            $(angular.element('.showDate')[i]).scope().showDate = bool;
            i++;
        }
    }

    $scope.setCopyDate = function (key) {
        $scope.copyDate = key;
    }

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.deleteDate = function (date) {
        delete $scope.showtimeDates[date];
    }

    $scope.addMovieToSelectedDate = function (movie) {
        
        if ($scope.dt === "")   
            return;

        var i = 0;
        for (var property in $scope.showtimeDates) {
            if ($(angular.element('.showDate')[i]).scope().key == $scope.dt){
                 $(angular.element('.showDate')[i]).scope().showDate = true;
                 break;
            }
            i++;
        }

        var formattedDate = $filter('date')($scope.dt, 'yyyy-MM-dd');

        if (!$scope.showtimeDates.hasOwnProperty(formattedDate) && $scope.dt != "") {
            $scope.showtimeDates[formattedDate] = [];
        }

        $scope.showtimeDates[formattedDate].push({ MovieId: movie.MovieId, MovieShowtimeId: '', ScheduleDate: formattedDate, Showtimes: '', MovieName: movie.Name });
    }

    $scope.copyMode = function (dt) {
        $scope.copyDate = dt;
        $scope.copy = !$scope.copy;
    }

    wolfMovieService.getWolfMovies(function (data) {
        $scope.wolfMovies = data;
    });

    $scope.$watch('dt', function () {
        if ($scope.dt != "") {
            var filteredDate = $filter('date')($scope.dt, 'yyyy-MM-dd');
            if (!$scope.showtimeDates[filteredDate])
                $scope.showtimeDates[filteredDate] = [];
        }
    });


});