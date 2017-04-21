/*global angular */
var app = angular.module('homeControllers', ['dataFactories', 'tagcanvasDirective']);

app.controller('HomeController', ['$scope', '$location', 'DataFactory', function ($scope, $location, DataFactory) {
    'use strict';

    var body = {
        "size": "0",
        "from": "0"
    };

    DataFactory.getNite(body).then(function (response) {
        $scope.nite = response.data;
    });

    DataFactory.getRapex(body).then(function (response) {
        $scope.rapex = response.data;
    });

}]);