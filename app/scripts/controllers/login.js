'use strict';

angular.module('wolfTheatresBackendApp').controller('LoginController', function ($scope, $rootScope, $location, $cookieStore) {
        $scope.user = {
            name: '',
            password: ''
        };

    $scope.submit = function (user){
        if (user.name === 'admin' && user.password === 'Wolf!'){
            $cookieStore.put('isLoggedIn', true);
            $cookieStore.put('user', $scope.user);
            $location.url('/movies/info');
        }
    };
}); 