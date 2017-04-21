/*global angular */
var app = angular.module('navbarControllers', ['searchFactories', 'translate']);

app.controller('NavbarController', ['$scope', '$location', '$rootScope', '$translate', 'SearchFactory', function ($scope, $location, $rootScope, $translate, SearchFactory) {
    'use strict';

    $scope.searchFactory = SearchFactory;
    
    $scope.searchSelect = {
        searchOptions: [
            {id: '1', name: 'I - NITE', category: 'Incidents (I)'},
//            {id: '2', name: 'I - RAPEX', category: 'Incidents (I)'},
//            {id: '3', name: 'I - CPSC', category: 'Incidents (I)'},
//            {id: '4', name: 'I - DPAX', category: 'Incidents (I)'},
//            {id: '5', name: 'R - NITE', category: 'Recalls (R)'},
            {id: '6', name: 'R - RAPEX', category: 'Recalls (R)'},
//            {id: '7', name: 'R - CPSC', category: 'Recalls (R)'},
//            {id: '7', name: 'R - DPAX', category: 'Recalls (R)'}
        ],
        selectedOption: {id: '1', name: 'I - NITE', categoryId: 'Incidents (I)'}
    };
    
    $scope.searchSubmit = function () {
        switch ($scope.searchSelect.selectedOption.id) {
        case '1':
            $location.path('/incidents/nite/records');
            $rootScope.$broadcast('navbarSearchNite');
            break;
        case '6':
            $location.path('/recalls/rapex/records');
            $rootScope.$broadcast('navbarSearchRapex');
            break;
        }
    };
    
    // Translation
    $scope.changeLanguage = function (lang) {
        $translate.use(lang);
    };
    
}]);