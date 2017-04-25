/*global angular */
var app = angular.module('sidebarControllers', ['filterFactories']);

app.controller('SidebarController', ['$scope', '$location', '$rootScope', 'NiteFilterFactory', 'RapexFilterFactory', function($scope, $location, $rootScope, NiteFilterFactory, RapexFilterFactory) {
    'use strict';
    console.log("sidebarControllers");
    // Add active class to current path
    $scope.isActive = function(path) {
        return path === $location.path();
    };

    /*
    |--------------------------------------------------------------------------
    | NITE Filter Checkbox
    |--------------------------------------------------------------------------
    */

    $scope.niteFilterFactory = NiteFilterFactory;

    // Host
    NiteFilterFactory.getNiteAge().then(function(response) {
        $scope.niteAge = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteGender().then(function(response) {
        $scope.niteGender = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteRegion().then(function(response) {
        $scope.niteRegion = response.data.aggregations.result;
    });

    // Vector
    NiteFilterFactory.getNiteProductName().then(function(response) {
        $scope.niteProductName = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteProductModel().then(function(response) {
        $scope.niteProductModel = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteProductManufacturer().then(function(response) {
        $scope.niteProductManufacturer = response.data.aggregations.result;
    });

    // Agent
    NiteFilterFactory.getNiteHazard().then(function(response) {
        $scope.niteHazard = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteCauseCode().then(function(response) {
        $scope.niteCauseCode = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteMechanism().then(function(response) {
        $scope.niteMechanism = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteFireInvolvement().then(function(response) {
        $scope.niteFireInvolvement = response.data.aggregations.result;
    });

    // Environment
    NiteFilterFactory.getNitePlace().then(function(response) {
        $scope.nitePlace = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteActivity().then(function(response) {
        $scope.niteActivity = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteWeather().then(function(response) {
        $scope.niteWeather = response.data.aggregations.result;
    });

    // Consequences
    NiteFilterFactory.getNiteDamageType().then(function(response) {
        $scope.niteDamageType = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteInjuredPart().then(function(response) {
        $scope.niteInjuredPart = response.data.aggregations.result;
    });
    NiteFilterFactory.getNiteInjuryType().then(function(response) {
        $scope.niteInjuryType = response.data.aggregations.result;
    });
    NiteFilterFactory.getNitePrevention().then(function(response) {
        $scope.nitePrevention = response.data.aggregations.result;
    });

    // Other
    NiteFilterFactory.getNiteMaterial().then(function(response) {
        $scope.niteMaterial = response.data.aggregations.result;
    });

    $scope.niteChecked = function() {
        $rootScope.$broadcast('filterSearchNite');
    };

    /*
    |--------------------------------------------------------------------------
    | RAPEX Filter Checkbox
    |--------------------------------------------------------------------------
    */

    $scope.rapexFilterFactory = RapexFilterFactory;

    RapexFilterFactory.getRapexCategory().then(function(response) {
        $scope.rapexCategory = response.data.aggregations.result;
    });
    RapexFilterFactory.getRapexNotifyingCountry().then(function(response) {
        $scope.rapexNotifyingCountry = response.data.aggregations.result;
    });
    RapexFilterFactory.getRapexOecd().then(function(response) {
        $scope.rapexOecd = response.data.aggregations.result;
    });
    RapexFilterFactory.getRapexOriginCountry().then(function(response) {
        $scope.rapexOriginCountry = response.data.aggregations.result;
    });
    RapexFilterFactory.getRapexProductType().then(function(response) {
        $scope.rapexProductType = response.data.aggregations.result;
    });
    RapexFilterFactory.getRapexProductsFound().then(function(response) {
        $scope.rapexProductsFound = response.data.aggregations.result;
    });
    RapexFilterFactory.getRapexRiskLevel().then(function(response) {
        $scope.rapexRiskLevel = response.data.aggregations.result;
    });
    RapexFilterFactory.getRapexRiskType().then(function(response) {
        $scope.rapexRiskType = response.data.aggregations.result;
    });
    RapexFilterFactory.getEuStandard().then(function(response) {
        console.info(response);
        $scope.euStandard = response.data.aggregations.result;
    });
      RapexFilterFactory.getChem().then(function(response) {
        console.info(response);
        $scope.chem = response.data.aggregations.result;
    });
    $scope.rapexChecked = function() {
        $rootScope.$broadcast('filterSearchRapex');
    };

}]);
