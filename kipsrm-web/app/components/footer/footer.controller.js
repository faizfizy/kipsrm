/*global angular*/
var app = angular.module('footerControllers', ['translate']);

app.controller('FooterController', ['$scope', '$translate', function ($scope, $translate) {
    'use strict';

    // Translation
    $scope.changeLanguage = function (lang) {
        $translate.use(lang);
    };

}]);