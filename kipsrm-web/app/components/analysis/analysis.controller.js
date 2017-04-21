/*global angular */
var app = angular.module('analysisControllers', ['uiGmapgoogle-maps', 'dataFactories', 'tagcanvasDirective']);

app.controller('GisController', ['$scope', function ($scope) {
    'use strict';
    
    $scope.map = {
        center: {
            latitude: 34.6937,
            longitude: 135.5022
        },
        zoom: 7,
        options: {mapTypeId: 'satellite'}
    };
    
    var markers = [
        {
            id: 0,
            latitude: 35.6895,
            longitude: 139.6917,
            title: "Tokyo",
            options: {labelClass: 'marker_labels', labelAnchor: '50 60', labelContent: 'Tokyo: 1441', labelClass: 'map-labels'}
        },
        {
            id: 1,
            latitude: 34.6937,
            longitude: 135.5022,
            title: "Osaka",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Osaka: 697', labelClass:'map-labels'}
        },
        {
            id: 2,
            latitude: 35.4475,
            longitude: 139.6423,
            title: "Kanagawa",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Kanagawa: 591', labelClass:'map-labels'}
        },
        {
            id: 3,
            latitude: 34.6913,
            longitude: 135.1831,
            title: "Hyogo",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Hyogo: 452', labelClass:'map-labels'}
        },
        {
            id: 4,
            latitude: 35.8617,
            longitude: 139.6455,
            title: "Saitama",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Saitama: 444', labelClass:'map-labels'}
        },
        {
            id: 5,
            latitude: 35.1802,
            longitude: 136.9066,
            title: "Aichi",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Aichi: 424', labelClass:'map-labels'}
        },
        {
            id: 6,
            latitude: 43.2203,
            longitude: 142.8635,
            title: "Hokkaido",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Hokkaido: 414', labelClass:'map-labels'}
        },
        {
            id: 7,
            latitude: 35.6051,
            longitude: 140.1233,
            title: "Chiba",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Chiba: 408', labelClass:'map-labels'}
        },
        {
            id: 8,
            latitude: 33.5904,
            longitude: 130.4017,
            title: "Fukuoka",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Fukuoka: 340', labelClass:'map-labels'}
        },
        {
            id: 9,
            latitude: 35.0116,
            longitude: 135.7680,
            title: "Kyoto",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Kyoto: 222', labelClass:'map-labels'}
        },
        {
            id: 10,
            latitude: 34.9771,
            longitude: 138.3831,
            title: "Shizuoka",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Shizuoka: 220', labelClass:'map-labels'}
        },
        {
            id: 11,
            latitude: 34.3852,
            longitude: 132.4553,
            title: "Hiroshima",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Hiroshima: 179', labelClass:'map-labels'}
        },
        {
            id: 12,
            latitude: 36.3418,
            longitude: 140.4468,
            title: "Ibaraki",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Ibaraki: 137', labelClass:'map-labels'}
        },
        {
            id: 13,
            latitude: 37.9026,
            longitude: 139.0231,
            title: "Niigata",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Niigata: 128', labelClass:'map-labels'}
        },
        {
            id: 14,
            latitude: 35.3912,
            longitude: 136.7223,
            title: "Gifu",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Gifu: 124', labelClass:'map-labels'}
        },
        {
            id: 15,
            latitude: 34.6551,
            longitude: 133.9195,
            title: "Okayama",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Okayama: 120', labelClass:'map-labels'}
        },
        {
            id: 16,
            latitude: 38.2688,
            longitude: 140.8721,
            title: "Miyagi",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Miyagi: 118', labelClass:'map-labels'}
        },
        {
            id: 17,
            latitude: 36.6513,
            longitude: 138.1810,
            title: "Nagano",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Nagano: 117', labelClass:'map-labels'}
        },
        {
            id: 18,
            latitude: 34.6851,
            longitude: 135.8050,
            title: "Nara",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Nara: 116', labelClass:'map-labels'}
        },
        {
            id: 19,
            latitude: 32.7503,
            longitude: 129.8777,
            title: "Nagasaki",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Nagasaki: 111', labelClass:'map-labels'}
        },
        {
            id: 20,
            latitude: 34.7303,
            longitude: 136.5086,
            title: "Mie",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Mie: 110', labelClass:'map-labels'}
        },
        {
            id: 21,
            latitude: 37.7503,
            longitude: 140.4676,
            title: "Fukushima",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Fukushima: 107', labelClass:'map-labels'}
        },
        {
            id: 22,
            latitude: 39.7036,
            longitude: 141.1527,
            title: "Iwate",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Iwate: 102', labelClass:'map-labels'}
        },
        {
            id: 23,
            latitude: 35.0045,
            longitude: 135.8686,
            title: "Shiga",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Shiga: 101', labelClass:'map-labels'}
        },
        {
            id: 24,
            latitude: 36.5657,
            longitude: 139.8836,
            title: "Tochigi",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Tochigi: 97', labelClass:'map-labels'}
        },
        {
            id: 25,
            latitude: 36.3907,
            longitude: 139.0604,
            title: "Gunma",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Gunma: 91', labelClass:'map-labels'}
        },
        {
            id: 26,
            latitude: 32.8031,
            longitude: 130.7079,
            title: "Kumamoto",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Kumamoto: 88', labelClass:'map-labels'}
        },
        {
            id: 27,
            latitude: 36.6960,
            longitude: 137.2137,
            title: "Toyama",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Toyama: 87', labelClass:'map-labels'}
        },
        {
            id: 28,
            latitude: 38.2554,
            longitude: 140.3396,
            title: "Yamagata",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Yamagata: 87', labelClass:'map-labels'}
        },
        {
            id: 29,
            latitude: 36.5947,
            longitude: 136.6256,
            title: "Ishikawa",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Ishikawa: 86', labelClass:'map-labels'}
        },
        {
            id: 30,
            latitude: 34.3401,
            longitude: 134.0434,
            title: "Kagawa",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Kagawa: 86', labelClass:'map-labels'}
        },
        {
            id: 31,
            latitude: 31.5966,
            longitude: 130.5571,
            title: "Kagoshima",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Kagoshima: 83', labelClass:'map-labels'}
        },
        {
            id: 32,
            latitude: 33.8416,
            longitude: 132.7657,
            title: "Ehime",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Ehime: 80', labelClass:'map-labels'}
        },
        {
            id: 33,
            latitude: 34.1860,
            longitude: 131.4706,
            title: "Yamaguchi",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Yamaguchi: 79', labelClass:'map-labels'}
        },
        {
            id: 34,
            latitude: 34.2305,
            longitude: 135.1708,
            title: "Wakayama",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Wakayama: 73', labelClass:'map-labels'}
        },
        {
            id: 35,
            latitude: 39.7199,
            longitude: 140.1036,
            title: "Akita",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Akita: 67', labelClass:'map-labels'}
        },
        {
            id: 36,
            latitude: 26.2124,
            longitude: 127.6809,
            title: "Okinawa",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Okinawa: 64', labelClass:'map-labels'}
        },
        {
            id: 37,
            latitude: 36.0641,
            longitude: 136.2195,
            title: "Fukui",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Fukui: 63', labelClass:'map-labels'}
        },
        {
            id: 38,
            latitude: 31.9077,
            longitude: 131.4202,
            title: "Miyazaki",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Miyazaki: 58', labelClass:'map-labels'}
        },
        {
            id: 39,
            latitude: 35.6642,
            longitude: 138.5684,
            title: "Yamanashi",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Yamanashi: 50', labelClass:'map-labels'}
        },
        {
            id: 40,
            latitude: 33.2382,
            longitude: 131.6126,
            title: "Oita",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Oita: 47', labelClass:'map-labels'}
        },
        {
            id: 41,
            latitude: 40.8243,
            longitude: 140.7400,
            title: "Aomori",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Aomori: 42', labelClass:'map-labels'}
        },
        {
            id: 42,
            latitude: 35.4723,
            longitude: 133.0505,
            title: "Shimane",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Shimane: 41', labelClass:'map-labels'}
        },
        {
            id: 43,
            latitude: 34.0703,
            longitude: 134.5548,
            title: "Tokushima",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Tokushima: 41', labelClass:'map-labels'}
        },
        {
            id: 44,
            latitude: 33.2635,
            longitude: 130.3009,
            title: "Saga",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Saga: 37', labelClass:'map-labels'}
        },
        {
            id: 45,
            latitude: 33.5596,
            longitude: 133.5293,
            title: "Kochi",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Kochi: 37', labelClass:'map-labels'}
        },
        {
            id: 46,
            latitude: 35.5039,
            longitude: 134.2377,
            title: "Tottori",
            options: {labelClass:'marker_labels',labelAnchor:'50 60',labelContent:'Tottori: 31', labelClass:'map-labels'}
        }
    ];
    $scope.randomMarkers = markers;

}]);

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