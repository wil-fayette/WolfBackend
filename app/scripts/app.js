'use strict';

/**
 * @ngdoc overview
 * @name wolfTheatresBackendApp
 * @description
 * # wolfTheatresBackendApp
 *
 * Main module of the application.
 */

// Here we set up an angular module. We'll attach controllers and 
// other components to this module.
var wolfApiUrl = 'http://localhost:55400/';

angular.module('wolfTheatresBackendApp', ['ngResource', 'ngCookies', 'ngRoute', 'ui.bootstrap', 'ngAnimate', 'snap', 'ngSanitize', 'angularUtils.directives.dirPagination', 'ui.utils', 'jQueryScrollbar'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/movies/info', { 
        templateUrl: 'views/movieInfo.html',
        controller: 'MovieInformationController'
      })
      .when('/movies/schedule', {
        templateUrl: 'views/movieSchedule.html',
        controller: 'MovieScheduleController'
      })
      .when('/website/index', {
        templateUrl: 'views/websiteIndex.html',
        controller: 'WebsiteIndexController'
      })
  }).run(function($rootScope, $location, $cookieStore) {
  $rootScope.$on('$routeChangeSuccess', function () {
    if($cookieStore.get('isLoggedIn') !== true) {
      $location.url('/login');
    }else{
        if ($location.$$path !== '/login'){
          $rootScope.page = $location.$$path;
          $rootScope.user = $cookieStore.get('user');
          $rootScope.isLoggedIn = true;
          return;
        }
    }
  });
});