/*global angular */
var app = angular.module('searchFactories', []);

app.factory('SearchFactory', [function () {
    "use strict";

    var searchFactory = {};

    searchFactory.keyword = "";

    return searchFactory;
}]);