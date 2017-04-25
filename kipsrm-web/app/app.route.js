/*global angular*/
var app = angular.module('route', ['ngRoute', 'CONSTANTS']);

app.config(['$routeProvider', 'CONSTANT', function ($routeProvider, CONSTANT) {
    "use strict";
    $routeProvider

        // Home
        .when('/home', {
            templateUrl: CONSTANT.ROOT + 'app/components/home/home.html',
            controller: 'HomeController'
        })
    
        // Incidents
        .when('/incidents/nite/records', {
            templateUrl: CONSTANT.ROOT + 'app/components/incidents/nite/records.html',
            controller: 'IncidentsNiteController'
        })
        .when('/incidents/nite/charts', {
            templateUrl: CONSTANT.ROOT + 'app/components/incidents/nite/charts.html',
            controller: 'IncidentsNiteController'
        })
        .when('/incidents/nite/gis', {
            templateUrl: CONSTANT.ROOT + 'app/components/incidents/nite/gis.html',
            controller: 'IncidentsNiteController'
        })
        .when('/incidents/nite/iidf', {
            templateUrl: CONSTANT.ROOT + 'app/components/incidents/nite/iidf.html',
            controller: 'IncidentsNiteController'
        })
    
        .when('/incidents/rapex', {
            templateUrl: CONSTANT.ROOT + 'app/components/incidents/rapex/rapex.html',
            //controller: 'IncidentsRapexController'
        })
    
        .when('/incidents/cpsc', {
            templateUrl: CONSTANT.ROOT + 'app/components/incidents/cpsc/cpsc.html',
            //controller: 'IncidentsCpscController'
        })
        .when('/incidents/dpax', {
            templateUrl: CONSTANT.ROOT + 'app/components/incidents/dpax/dpax.html',
            //controller: 'IncidentsDpaxController'
        })
    
        // Recalls
        .when('/recalls/nite', {
            templateUrl: CONSTANT.ROOT + 'app/components/recalls/nite/nite.html',
            //controller: 'RapexNiteController'
        })
    
        .when('/recalls/rapex/records', {
            templateUrl: CONSTANT.ROOT + 'app/components/recalls/rapex/records.html',
            controller: 'RecallsRapexController'
        })
        .when('/recalls/rapex/charts', {
            templateUrl: CONSTANT.ROOT + 'app/components/recalls/rapex/charts.html',
            controller: 'RecallsRapexController'
        })
        .when('/recalls/rapex/wordcloud', {
            templateUrl: CONSTANT.ROOT + 'app/components/recalls/rapex/wordcloud.html',
            controller: 'RecallsRapexController'
        })
    
        .when('/recalls/cpsc', {
            templateUrl: CONSTANT.ROOT + 'app/components/recalls/cpsc/cpsc.html',
            //controller: 'RapexCpscController'
        })
        .when('/recalls/dpax', {
            templateUrl: CONSTANT.ROOT + 'app/components/recalls/dpax/dpax.html',
            //controller: 'RapexDpaxController'
        })

        // Analysis
        .when('/analysis/social', {
            templateUrl: CONSTANT.ROOT + 'app/components/analysis/social.html',
            controller: 'SocialController'
        })
        .when('/analysis/iidf', {
            templateUrl: CONSTANT.ROOT + 'app/components/analysis/iidf.html',
            controller: 'IidfController'
        })
        .when('/analysis/wordcloud', {
            templateUrl: CONSTANT.ROOT + 'app/components/analysis/tagcanvas.html',
            controller: 'TagcanvasController'
        })

        // Settings
        .when('/settings', {
            templateUrl: CONSTANT.ROOT + 'app/components/settings/settings.html',
            controller: 'SettingsController'
        })

        .otherwise({
            redirectTo: '/home'
        });
}]);
