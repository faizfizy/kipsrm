/*global angular */
var app = angular.module('analysisControllers', ['uiGmapgoogle-maps', 'dataFactories', 'tagcanvasDirective']);

app.controller('SocialController', ['$scope', '$timeout', function ($scope, $timeout) {
    'use strict';
    
    $timeout = twttr.widgets.load();
    
}]);

app.controller('IidfController', ['$scope', function ($scope) {
    'use strict';
    
    Highcharts.chart('container', {

        chart: {
            type: 'heatmap',
            marginTop: 40,
            marginBottom: 40
        },


        title: {
            text: 'IIDF Analysis'
        },

        xAxis: {
            title: {
                text: 'Incident Cause Code'
            },
            categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
        },

        yAxis: {
            categories: ['H1M1', 'H1M2', 'H1M3', 'H1M4', 'H1M5'],
            title: {
                text: 'Hazard + Mechanism'
            },
        },

        credits: {
            enabled: false
        },

        colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: Highcharts.getOptions().colors[0]
        },

        legend: {
            align: 'right',
            layout: 'vertical',
            margin: 0,
            verticalAlign: 'top',
            y: 25,
            symbolHeight: 320
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> cause code <br><b>' +
                    this.point.value + '</b> incidents <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
            }
        },

        series: [{
            name: 'Incidents per cause',
            borderWidth: 1,
            data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
            dataLabels: {
                enabled: true,
                color: 'black',
                style: {
                    textShadow: 'none'
                }
            }
        }]

    });
    
}]);

app.controller('TagcanvasController', ['$scope', 'DataFactory', function ($scope, DataFactory) {
    'use strict';

    var rapexChemical = {
            "aggregations": [{
                "field": "chemical",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexEuStandard = {
            "aggregations": [{
                "field": "euStandard",
                "name": "results",
                "type": "terms"
            }]
        };

    DataFactory.getRapex(rapexChemical).then(function (response) {
        var results, result;

        // Initialize empty wordList array
        $scope.chemicalWordList = [];

        results = response.data.aggregations.results;

        // Convert response to worList
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.chemicalWordList.push({
                    href: "",
                    fontSize: (results[result] / 100) + "ex",
                    text: result
                });
            }
        }
        console.log("Chemical: " + $scope.chemicalWordList);
    });
    
    DataFactory.getRapex(rapexEuStandard).then(function (response) {
        var results, result;

        // Initialize empty wordList array
        $scope.euStandardWordList = [];

        results = response.data.aggregations.results;

        // Convert response to wordList
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.euStandardWordList.push({
                    href: "",
                    fontSize: (results[result] / 100) + "ex",
                    text: result
                });
            }
        }
        console.log("EU Standard: " + $scope.euStandardWordList);
    });

}]);