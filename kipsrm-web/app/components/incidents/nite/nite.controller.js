/*global angular */
var app = angular.module('incidentsNiteControllers', ['ui.bootstrap', 'dataFactories', 'searchFactories', 'filterFactories', 'highlightDirective', 'chart.js', 'uiGmapgoogle-maps', "leaflet-directive"]);

app.controller('IncidentsNiteController', ['$scope', '$location', 'DataFactory', 'SearchFactory', 'NiteFilterFactory', function ($scope, $location, DataFactory, SearchFactory, NiteFilterFactory) {
    'use strict';

    /*
    |--------------------------------------------------------------------------
    |
    | RECORDS
    |
    |--------------------------------------------------------------------------
    */

    // Factory
    $scope.searchFactory = SearchFactory;

    // Records Per Page Select
    $scope.itemsPerPage = 10;
    $scope.perPage = [10, 25, 50, 100];

    // Pagination
    var from = 0;
    $scope.page = 1;

    // Factory Request
    function getNiteData() {
        var body = {
            "size": $scope.itemsPerPage,
            "from": from,
            "keyword": SearchFactory.keyword,
            "filters": {
                // Host
                "age": NiteFilterFactory.niteAgeChecked,
                "gender": NiteFilterFactory.niteGenderChecked,
                "region": NiteFilterFactory.niteRegionChecked,
                // Vector
                "product_name.keyword": NiteFilterFactory.niteProductNameChecked,
                "product_model.keyword": NiteFilterFactory.niteProductModelChecked,
                "product_manufacturer.keyword": NiteFilterFactory.niteProductManufacturerChecked,
                // Agent
                "hazard": NiteFilterFactory.niteHazardChecked,
                "incident_cause_code": NiteFilterFactory.niteCauseCodeChecked,
                "mechanism": NiteFilterFactory.niteMechanismChecked,
                "fireInvolved": NiteFilterFactory.niteFireInvolvementChecked,
                // Environment
                //"ranges": {"incident_date": [{"gte": "2005-01-01", "lte" : "2005-12-31"}]},
                "placeOfOccurence": NiteFilterFactory.nitePlaceChecked,
                "activity": NiteFilterFactory.niteActivityChecked,
                "weather": NiteFilterFactory.niteWeatherChecked,
                // Consequences
                "damage_type": NiteFilterFactory.niteDamageTypeChecked,
                "injuredPart": NiteFilterFactory.niteInjuredPartChecked,
                "injuryType": NiteFilterFactory.niteInjuryTypeChecked,
                "prevention.keyword": NiteFilterFactory.nitePreventionChecked,
                // Other
                "material": NiteFilterFactory.niteMaterialChecked
            }
        };

        DataFactory.getNite(body).then(function (response) {
            $scope.nite = response.data;
        });
    }

    // First-time load
    getNiteData();

    // Change records per page
    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;

        // Reset to first page
        from = 0;
        $scope.page = 1;

        getNiteData();
    };

    // Change page
    $scope.changePage = function (num) {

        $scope.itemsPerPage = num;
        from = num * ($scope.page - 1); // Calculate page

        getNiteData();
    };

    // Trigger search from navbar or filter
    $scope.$on('navbarSearchNite', function (event, args) {

        NiteFilterFactory.resetFilter();

        // Reset to first page
        from = 0;
        $scope.page = 1;

        getNiteData();
    });
    $scope.$on('filterSearchNite', function (event, args) {

        // Reset to first page
        from = 0;
        $scope.page = 1;

        getNiteData();
    });

    // Display single incident details in modal
    $scope.displayDetailsNite = function (id) {
        var body = {
            "size": "1",
            "from": "0",
            "filters": {
                "annual_number": id
            },
            "responseFields": [
                "annual_number",
                "damage_type",
                "incident_cause",
                "incident_details",
                "incident_cause_code",
                "incident_date",
                "incident_details",
                "incident_payment_date",
                "informed_party",
                "item_classification",
                "item_classification_code",
                "prevention",
                "product_manufacturer",
                "product_model",
                "product_name",
                "product_usage_duration",
                "daysUsed",
                "timesUsed"
            ]
        };

        DataFactory.getNite(body).then(function (response) {
            $scope.details = response.data;
        });
    };

    /*
    |--------------------------------------------------------------------------
    |
    | CHARTS
    |
    |--------------------------------------------------------------------------
    */

    // Charts colour
    $scope.colors = ['#4D4D4D', '#5DA5DA', '#FAA43A', '#60BD68', '#F17CB0', '#B2912F', '#B276B2', '#DECF3F', '#F15854', '#00FF00'];

    /*
    |--------------------------------------------------------------------------
    | Request body
    |--------------------------------------------------------------------------
    */

    var // Host
        niteAge = {
            "aggregations": [{
                "field": "age",
                "name": "results",
                "type": "terms"
            }]
        },
        niteGender = {
            "aggregations": [{
                "field": "gender",
                "name": "results",
                "type": "terms"
            }]
        },
        niteRegion = {
            "aggregations": [{
                "field": "region",
                "name": "results",
                "type": "terms"
            }]
        },

        // Vector
        niteProductName = {
            "aggregations": [{
                "field": "product_name.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        niteProductModel = {
            "aggregations": [{
                "field": "product_model.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        niteProductManufacturer = {
            "aggregations": [{
                "field": "product_manufacturer.keyword",
                "name": "results",
                "type": "terms"
            }]
        },

        // Agent
        niteHazard = {
            "aggregations": [{
                "field": "hazard",
                "name": "results",
                "type": "terms"
            }]
        },
        niteCauseCode = {
            "aggregations": [{
                "field": "incident_cause_code",
                "name": "results",
                "type": "terms"
            }]
        },
        niteMechanism = {
            "aggregations": [{
                "field": "mechanism",
                "name": "results",
                "type": "terms"
            }]
        },
        niteFireInvolvement = {
            "aggregations": [{
                "field": "fireInvolved",
                "name": "results",
                "type": "terms"
            }]
        },

        // Environment
        niteDate = {
            "filters": {
                "ranges": {
                    "incident_date": [{
                        "gte": "2006-01-01"
                    }]
                }
            },
            "aggregations": [{
                "name": "results",
                "type": "dateHistogram",
                "field": "incident_date",
                "interval": "year"
            }]
        },
        nitePlace = {
            "aggregations": [{
                "field": "placeOfOccurence",
                "name": "results",
                "type": "terms"
            }]
        },
        niteActivity = {
            "aggregations": [{
                "field": "activity",
                "name": "results",
                "type": "terms"
            }]
        },
        niteWeather = {
            "aggregations": [{
                "field": "weather",
                "name": "results",
                "type": "terms"
            }]
        },

        // Consequences
        niteDamageType = {
            "aggregations": [{
                "field": "damage_type",
                "name": "results",
                "type": "terms"
            }]
        },
        niteInjuredPart = {
            "aggregations": [{
                "field": "injuredPart",
                "name": "results",
                "type": "terms"
            }]
        },
        niteInjuryType = {
            "aggregations": [{
                "field": "injuryType",
                "name": "results",
                "type": "terms"
            }]
        },

        // Other
        niteMaterial = {
            "aggregations": [{
                "field": "material",
                "name": "results",
                "type": "terms"
            }]
        };

    /*
    |--------------------------------------------------------------------------
    | Factory Request
    |--------------------------------------------------------------------------
    */

    // Host
    DataFactory.getNite(niteAge).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsAge = [];
        $scope.dataAge = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsAge.push(result);
                $scope.dataAge.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteGender).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsGender = [];
        $scope.dataGender = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsGender.push(result);
                $scope.dataGender.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteRegion).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsRegion = [];
        $scope.dataRegion = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsRegion.push(result);
                $scope.dataRegion.push(results[result]);
            }
        }
    });

    // Vector
    DataFactory.getNite(niteProductName).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsProductName = [];
        $scope.dataProductName = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsProductName.push(result);
                $scope.dataProductName.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteProductModel).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsProductModel = [];
        $scope.dataProductModel = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsProductModel.push(result);
                $scope.dataProductModel.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteProductManufacturer).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsProductManufacturer = [];
        $scope.dataProductManufacturer = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsProductManufacturer.push(result);
                $scope.dataProductManufacturer.push(results[result]);
            }
        }
    });

    // Agent
    DataFactory.getNite(niteHazard).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsHazard = [];
        $scope.dataHazard = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsHazard.push(result);
                $scope.dataHazard.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteCauseCode).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsCauseCode = [];
        $scope.dataCauseCode = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsCauseCode.push(result);
                $scope.dataCauseCode.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteMechanism).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsMechanism = [];
        $scope.dataMechanism = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsMechanism.push(result);
                $scope.dataMechanism.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteFireInvolvement).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsFireInvolvement = [];
        $scope.dataFireInvolvement = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsFireInvolvement.push(result);
                $scope.dataFireInvolvement.push(results[result]);
            }
        }
    });

    // Environment
    DataFactory.getNite(niteDate).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsDate = [];
        $scope.dataDate = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsDate.push(result.substring(0, 4));
                $scope.dataDate.push(results[result]);
            }
        }
        $scope.dataDate = [$scope.dataDate]; // fix library RGB bug issue
    });
    DataFactory.getNite(nitePlace).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsPlace = [];
        $scope.dataPlace = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsPlace.push(result);
                $scope.dataPlace.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteActivity).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsActivity = [];
        $scope.dataActivity = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsActivity.push(result);
                $scope.dataActivity.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteWeather).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsWeather = [];
        $scope.dataWeather = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsWeather.push(result);
                $scope.dataWeather.push(results[result]);
            }
        }
    });

    // Consequences
    DataFactory.getNite(niteDamageType).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsDamageType = [];
        $scope.dataDamageType = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsDamageType.push(result);
                $scope.dataDamageType.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteInjuredPart).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsInjuredPart = [];
        $scope.dataInjuredPart = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsInjuredPart.push(result);
                $scope.dataInjuredPart.push(results[result]);
            }
        }
    });
    DataFactory.getNite(niteInjuryType).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsInjuryType = [];
        $scope.dataInjuryType = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsInjuryType.push(result);
                $scope.dataInjuryType.push(results[result]);
            }
        }
    });

    // Other
    DataFactory.getNite(niteMaterial).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsNiteMaterial = [];
        $scope.dataNiteMaterial = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsNiteMaterial.push(result);
                $scope.dataNiteMaterial.push(results[result]);
            }
        }
    });

    /*
    |--------------------------------------------------------------------------
    |
    | GIS
    |
    |--------------------------------------------------------------------------
    */

    var markers = [
        {
            lat: 35.6895,
            lng: 139.6917,
            label: {
                message: 'Tokyo: 1441',
                options: {
                    noHide: true
                }
            }
        },
        {
            lat: 34.6937,
            lng: 135.5022,
            label: {
                message: 'Osaka: 697',
                options: {
                    noHide: true
                }
            }
        },
        {
            lat: 35.4475,
            lng: 139.6423,
            label: {

                message: 'Kanagawa: 591',
                options: {
                    noHide: true
                }
            }
        },
        {
            lat: 34.6913,
            lng: 135.1831,
            label: {

                message: 'Hyogo: 452',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 4,
            lat: 35.8617,
            lng: 139.6455,
            title: "Saitama",
            label: {


                message: 'Saitama: 444',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 5,
            lat: 35.1802,
            lng: 136.9066,
            title: "Aichi",
            label: {


                message: 'Aichi: 424',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 6,
            lat: 43.2203,
            lng: 142.8635,
            title: "Hokkaido",
            label: {


                message: 'Hokkaido: 414',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 7,
            lat: 35.6051,
            lng: 140.1233,
            title: "Chiba",
            label: {


                message: 'Chiba: 408',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 8,
            lat: 33.5904,
            lng: 130.4017,
            title: "Fukuoka",
            label: {


                message: 'Fukuoka: 340',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 9,
            lat: 35.0116,
            lng: 135.7680,
            title: "Kyoto",
            label: {


                message: 'Kyoto: 222',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 10,
            lat: 34.9771,
            lng: 138.3831,
            title: "Shizuoka",
            label: {


                message: 'Shizuoka: 220',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 11,
            lat: 34.3852,
            lng: 132.4553,
            title: "Hiroshima",
            label: {


                message: 'Hiroshima: 179',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 12,
            lat: 36.3418,
            lng: 140.4468,
            title: "Ibaraki",
            label: {


                message: 'Ibaraki: 137',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 13,
            lat: 37.9026,
            lng: 139.0231,
            title: "Niigata",
            label: {


                message: 'Niigata: 128',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 14,
            lat: 35.3912,
            lng: 136.7223,
            title: "Gifu",
            label: {


                message: 'Gifu: 124',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 15,
            lat: 34.6551,
            lng: 133.9195,
            title: "Okayama",
            label: {


                message: 'Okayama: 120',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 16,
            lat: 38.2688,
            lng: 140.8721,
            title: "Miyagi",
            label: {


                message: 'Miyagi: 118',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 17,
            lat: 36.6513,
            lng: 138.1810,
            title: "Nagano",
            label: {


                message: 'Nagano: 117',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 18,
            lat: 34.6851,
            lng: 135.8050,
            title: "Nara",
            label: {


                message: 'Nara: 116',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 19,
            lat: 32.7503,
            lng: 129.8777,
            title: "Nagasaki",
            label: {


                message: 'Nagasaki: 111',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 20,
            lat: 34.7303,
            lng: 136.5086,
            title: "Mie",
            label: {


                message: 'Mie: 110',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 21,
            lat: 37.7503,
            lng: 140.4676,
            title: "Fukushima",
            label: {


                message: 'Fukushima: 107',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 22,
            lat: 39.7036,
            lng: 141.1527,
            title: "Iwate",
            label: {


                message: 'Iwate: 102',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 23,
            lat: 35.0045,
            lng: 135.8686,
            title: "Shiga",
            label: {


                message: 'Shiga: 101',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 24,
            lat: 36.5657,
            lng: 139.8836,
            title: "Tochigi",
            label: {


                message: 'Tochigi: 97',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 25,
            lat: 36.3907,
            lng: 139.0604,
            title: "Gunma",
            label: {


                message: 'Gunma: 91',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 26,
            lat: 32.8031,
            lng: 130.7079,
            title: "Kumamoto",
            label: {


                message: 'Kumamoto: 88',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 27,
            lat: 36.6960,
            lng: 137.2137,
            title: "Toyama",
            label: {


                message: 'Toyama: 87',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 28,
            lat: 38.2554,
            lng: 140.3396,
            title: "Yamagata",
            label: {


                message: 'Yamagata: 87',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 29,
            lat: 36.5947,
            lng: 136.6256,
            title: "Ishikawa",
            label: {


                message: 'Ishikawa: 86',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 30,
            lat: 34.3401,
            lng: 134.0434,
            title: "Kagawa",
            label: {


                message: 'Kagawa: 86',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 31,
            lat: 31.5966,
            lng: 130.5571,
            title: "Kagoshima",
            label: {


                message: 'Kagoshima: 83',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 32,
            lat: 33.8416,
            lng: 132.7657,
            title: "Ehime",
            label: {


                message: 'Ehime: 80',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 33,
            lat: 34.1860,
            lng: 131.4706,
            title: "Yamaguchi",
            label: {


                message: 'Yamaguchi: 79',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 34,
            lat: 34.2305,
            lng: 135.1708,
            title: "Wakayama",
            label: {


                message: 'Wakayama: 73',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 35,
            lat: 39.7199,
            lng: 140.1036,
            title: "Akita",
            label: {


                message: 'Akita: 67',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 36,
            lat: 26.2124,
            lng: 127.6809,
            title: "Okinawa",
            label: {


                message: 'Okinawa: 64',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 37,
            lat: 36.0641,
            lng: 136.2195,
            title: "Fukui",
            label: {


                message: 'Fukui: 63',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 38,
            lat: 31.9077,
            lng: 131.4202,
            title: "Miyazaki",
            label: {


                message: 'Miyazaki: 58',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 39,
            lat: 35.6642,
            lng: 138.5684,
            title: "Yamanashi",
            label: {


                message: 'Yamanashi: 50',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 40,
            lat: 33.2382,
            lng: 131.6126,
            title: "Oita",
            label: {


                message: 'Oita: 47',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 41,
            lat: 40.8243,
            lng: 140.7400,
            title: "Aomori",
            label: {


                message: 'Aomori: 42',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 42,
            lat: 35.4723,
            lng: 133.0505,
            title: "Shimane",
            label: {


                message: 'Shimane: 41',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 43,
            lat: 34.0703,
            lng: 134.5548,
            title: "Tokushima",
            label: {


                message: 'Tokushima: 41',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 44,
            lat: 33.2635,
            lng: 130.3009,
            title: "Saga",
            label: {


                message: 'Saga: 37',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 45,
            lat: 33.5596,
            lng: 133.5293,
            title: "Kochi",
            label: {


                message: 'Kochi: 37',
                options: {
                    noHide: true
                }
            }
        },
        {
            id: 46,
            lat: 35.5039,
            lng: 134.2377,
            title: "Tottori",
            label: {


                message: 'Tottori: 31',
                options: {
                    noHide: true
                }
            }
        }
    ];

    angular.extend($scope, {
        london: {
            lat: 35.644763,
            lng: 136.5022,
            zoom: 6
        },
        markers: markers
    });

    /*
    |--------------------------------------------------------------------------
    |
    | IIDF Analysis
    |
    |--------------------------------------------------------------------------
    */

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
