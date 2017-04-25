/*global angular*/
var app = angular.module('dataFactories', ['CONSTANTS']);

app.factory('DataFactory', ['$http', 'CONSTANT', function ($http, CONSTANT) {
    "use strict";

    var urlNite = CONSTANT.BASE_URL + "nite",
        urlRapex = CONSTANT.BASE_URL + "rapex",
        urlIidfHm = CONSTANT.BASE_URL_IIDF + "hm", // Hazard vs Motion
        urlIidfHo = CONSTANT.BASE_URL_IIDF + "ho", // Hazard vs Object
        urlIidfHmat = CONSTANT.BASE_URL_IIDF + "hmat", // Hazard vs Material
        urlIidfHmec = CONSTANT.BASE_URL_IIDF + "hmec", // Hazard vs Mechanism
        urlIidfHact = CONSTANT.BASE_URL_IIDF + "hact", // Hazard vs Activity
        header = {
            headers: {
                'REMOTE_USER': 'AABBCC112233'
            }
        },
        dataFactory = {};

    dataFactory.getNite = function (body) {
        return $http.post(urlNite, body);
    };

    dataFactory.getRapex = function (body) {
        return $http.post(urlRapex, body);
    };

    // IIDF

    dataFactory.getIidfHm = function () {
        return $http.get(urlIidfHm);
    }

    dataFactory.getIidfHo = function () {
        return $http.get(urlIidfHo);
    }

    dataFactory.getIidfHmat = function () {
        return $http.get(urlIidfHmat);
    }

    dataFactory.getIidfHmec = function () {
        return $http.get(urlIidfHmec);
    }
    
    dataFactory.getIidfHact = function () {
        return $http.get(urlIidfHact);
    }

    return dataFactory;
}]);