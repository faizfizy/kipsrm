/*global angular*/
var app = angular.module('dataFactories', ['CONSTANTS']);

app.factory('DataFactory', ['$http', 'CONSTANT', function ($http, CONSTANT) {
    "use strict";

    var urlNite = CONSTANT.BASE_URL + "nite",
        urlRapex = CONSTANT.BASE_URL + "rapex",
        header = {
            headers: {
                'REMOTE_USER': 'AABBCC112233'
            }
        },
        dataFactory = {};

    dataFactory.getNite = function (body) {
        return $http.post(urlNite, body, header);
    };

    dataFactory.getRapex = function (body) {
        return $http.post(urlRapex, body, header);
    };

    return dataFactory;
}]);