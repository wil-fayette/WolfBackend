'use strict';

angular.module('wolfTheatresBackendApp').factory('imageService', function ($http) {
    var imageService = {};

    imageService.getImages = function (page, callback) {
        $http.get(wolfApiUrl + 'api/Image/get?page=' + page).success(function (data) {
            callback(data);
        });
    }

    imageService.deleteImage = function (imageId, callback){
        $http.delete(wolfApiUrl + 'api/Image/delete?imageId=' + imageId).success(function (data){
            callback(data);
        });
    }
    return imageService;
});