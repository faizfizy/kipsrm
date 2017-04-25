/*global angular */
var app = angular.module('analysisControllers', ['uiGmapgoogle-maps', 'dataFactories', 'tagcanvasDirective']);

app.controller('SocialController', ['$scope', '$timeout', function ($scope, $timeout) {
    'use strict';

    $timeout = twttr.widgets.load();

}]);

app.controller('IidfController', ['$scope', 'DataFactory', function ($scope, DataFactory) {
    'use strict';
    
    DataFactory.getIidfHm().then(function (response) {

        var data = response.data.iidfData,
            xAxisTitle = response.data.xAxisLabel,
            xAxisCategories = response.data.xAxisCat,
            yAxisTitle = response.data.yAxisLabel,
            yAxisCategories = response.data.yAxisCat;

        Highcharts.chart('iidfHm', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 50
            },


            title: {
                text: 'Hazard vs Motion'
            },

            xAxis: {
                title: {
                    text: xAxisTitle
                },
                categories: xAxisCategories
            },

            yAxis: {
                categories: yAxisCategories,
                title: {
                    text: yAxisTitle
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
                data: data,
                dataLabels: {
                    enabled: true,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }
        }]

        });

    });
    
    DataFactory.getIidfHo().then(function (response) {

        console.log(response.data);

        var data = response.data.iidfData,
            xAxisTitle = response.data.xAxisLabel,
            xAxisCategories = response.data.xAxisCat,
            yAxisTitle = response.data.yAxisLabel,
            yAxisCategories = response.data.yAxisCat;

        Highcharts.chart('iidfHo', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 50
            },


            title: {
                text: 'Hazard vs Object'
            },

            xAxis: {
                title: {
                    text: xAxisTitle
                },
                categories: xAxisCategories
            },

            yAxis: {
                categories: yAxisCategories,
                title: {
                    text: yAxisTitle
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
                data: data,
                dataLabels: {
                    enabled: true,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }
        }]

        });

    });
    
    DataFactory.getIidfHmat().then(function (response) {

        console.log(response.data);

        var data = response.data.iidfData,
            xAxisTitle = response.data.xAxisLabel,
            xAxisCategories = response.data.xAxisCat,
            yAxisTitle = response.data.yAxisLabel,
            yAxisCategories = response.data.yAxisCat;

        Highcharts.chart('iidfHmat', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 50
            },


            title: {
                text: 'Hazard vs Material'
            },

            xAxis: {
                title: {
                    text: xAxisTitle
                },
                categories: xAxisCategories
            },

            yAxis: {
                categories: yAxisCategories,
                title: {
                    text: yAxisTitle
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
                data: data,
                dataLabels: {
                    enabled: true,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }
        }]

        });

    });
    
    DataFactory.getIidfHmec().then(function (response) {

        console.log(response.data);

        var data = response.data.iidfData,
            xAxisTitle = response.data.xAxisLabel,
            xAxisCategories = response.data.xAxisCat,
            yAxisTitle = response.data.yAxisLabel,
            yAxisCategories = response.data.yAxisCat;

        Highcharts.chart('iidfHmec', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 50
            },


            title: {
                text: 'Hazard vs Mechanism'
            },

            xAxis: {
                title: {
                    text: xAxisTitle
                },
                categories: xAxisCategories
            },

            yAxis: {
                categories: yAxisCategories,
                title: {
                    text: yAxisTitle
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
                data: data,
                dataLabels: {
                    enabled: true,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }
        }]

        });

    });
    
    DataFactory.getIidfHact().then(function (response) {

        console.log(response.data);

        var data = response.data.iidfData,
            xAxisTitle = response.data.xAxisLabel,
            xAxisCategories = response.data.xAxisCat,
            yAxisTitle = response.data.yAxisLabel,
            yAxisCategories = response.data.yAxisCat;

        Highcharts.chart('iidfHact', {

            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 50
            },


            title: {
                text: 'Hazard vs Activity'
            },

            xAxis: {
                title: {
                    text: xAxisTitle
                },
                categories: xAxisCategories
            },

            yAxis: {
                categories: yAxisCategories,
                title: {
                    text: yAxisTitle
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
                data: data,
                dataLabels: {
                    enabled: true,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }
        }]

        });

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