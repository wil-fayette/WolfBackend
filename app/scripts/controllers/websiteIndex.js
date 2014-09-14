'use strict';

angular.module('wolfTheatresBackendApp').controller('WebsiteIndexController', function ($scope, imageService) {
    $scope.showCarousel = true;
    $scope.publishDisabled = false;

    function removeImageById(id, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].ImageId === id) {
                array.splice(i, 1);
            }
        }
    }

    imageService.getImages('HOME', function (data){
        $scope.images = data;
    });

    $scope.selectImage = function(image){
        if ($scope.selectedImage == image){
            $scope.selectedImage = "";
        }else {
            $scope.selectedImage = image;
        }
    }

    $scope.deleteImage = function(image){
        imageService.deleteImage(image.ImageId, function (data){
            removeImageById(image.ImageId, $scope.images);
        });
    }


     $scope.uploadImage = function uploadImage(image) {
        debugger;
        if ($('#' + image).get(0) != null) {
            var files = $('#' + image).get(0).files;

            if (files.length > 0) {
                if (window.FormData !== undefined) {
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append('file' + i, files[i]);
                    }

                    data.append('page', 'HOME');

                    $.ajax({
                        type: 'POST',
                        url: wolfApiUrl + 'api/Image/Post',
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (results) {
                            debugger;
                            for (var i = 0; i < results.length; i++) {
                                $scope.images.push(results[i]);

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


});