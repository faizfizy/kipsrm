/*global angular */
var app = angular.module('recallsRapexControllers', ['ui.bootstrap', 'dataFactories', 'searchFactories', 'filterFactories', 'highlightDirective', 'chart.js', 'tagcanvasDirective']);

app.controller('RecallsRapexController', ['$scope', '$location', 'DataFactory', 'SearchFactory', 'RapexFilterFactory', function ($scope, $location, DataFactory, SearchFactory, RapexFilterFactory) {
    'use strict';
    
    /*
    |--------------------------------------------------------------------------
    |
    | RECORDS
    |
    |--------------------------------------------------------------------------
    */

    // Search
    $scope.searchFactory = SearchFactory;

    // Records Per Page Select
    $scope.itemsPerPage = 10;
    $scope.perPage = [10, 25, 50, 100];

    // Pagination
    var from = 0;
    $scope.page = 1;

    // Factory Request
    function getRapexData() {
        var body = {
            "size": $scope.itemsPerPage,
            "from": from,
            "keyword": SearchFactory.keyword,
            "filters": {
                "category": RapexFilterFactory.rapexCategoryChecked,
                "notifying_country": RapexFilterFactory.rapexNotifyingCountryChecked,
                "oecd_por_cat": RapexFilterFactory.rapexOecdChecked,
                "origin_country": RapexFilterFactory.rapexOriginCountryChecked,
                "product_type": RapexFilterFactory.rapexProductTypeChecked,
                "products_found": RapexFilterFactory.rapexProductsFoundChecked,
                "risk_level": RapexFilterFactory.rapexRiskLevelChecked,
                "risk_type": RapexFilterFactory.rapexRiskTypeChecked
            }
        };

        DataFactory.getRapex(body).then(function (response) {
            $scope.rapex = response.data;
        });
    }

    // First-time load
    getRapexData();

    // Change records per page
    $scope.setItemsPerPage = function (num) {
        $scope.itemsPerPage = num;

        // Reset to first page
        from = 0;
        $scope.page = 1;

        getRapexData();
    };

    // Change page
    $scope.changePage = function (num) {

        $scope.itemsPerPage = num;
        from = num * ($scope.page - 1); // Calculate page

        getRapexData();
    };

    // Trigger search from navbar or filter
    $scope.$on('navbarSearchRapex', function (event, args) {

        RapexFilterFactory.resetFilter();

        // Reset to first page
        from = 0;
        $scope.page = 1;

        getRapexData();
    });
    $scope.$on('filterSearchRapex', function (event, args) {

        // Reset to first page
        from = 0;
        $scope.page = 1;

        getRapexData();
    });

    // Display single recall details in modal
    $scope.displayDetailsRapex = function (id) {
        var body = {
            "size": "1",
            "from": "0",
            "filters": {
                "refnr": id
            },
            "responseFields": [
                "id",
                "refnr",
                "risk_level",
                "product_type",
                "notifying_country",
                "origin_country",
                "counterfeit",
                "risk_type",
                "product",
                "product_name",
                "product_desc",
                "brand",
                "category",
                "type_model",
                "batch_barcode",
                "oecd_por_cat",
                "risk_desc",
                "measures",
                "products_found",
                "ner"
            ]
        };

        DataFactory.getRapex(body).then(function (response) {
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
        },

        // RAPEX
        rapexCategory = {
            "aggregations": [{
                "field": "category.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexNotifyingCountry = {
            "aggregations": [{
                "field": "notifying_country.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexOecd = {
            "aggregations": [{
                "field": "oecd_por_cat.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexOriginCountry = {
            "aggregations": [{
                "field": "origin_country.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexProductType = {
            "aggregations": [{
                "field": "product_type.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexProductsFound = {
            "aggregations": [{
                "field": "products_found.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexRiskLevel = {
            "aggregations": [{
                "field": "risk_level.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexRiskType = {
            "aggregations": [{
                "field": "risk_type.keyword",
                "name": "results",
                "type": "terms"
            }]
        },
        rapexChemical = {
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

    // RAPEX
    DataFactory.getRapex(rapexCategory).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsCategory = [];
        $scope.dataCategory = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsCategory.push(result);
                $scope.dataCategory.push(results[result]);
            }
        }
    });
    DataFactory.getRapex(rapexNotifyingCountry).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsNotifyingCountry = [];
        $scope.dataNotifyingCountry = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsNotifyingCountry.push(result);
                $scope.dataNotifyingCountry.push(results[result]);
            }
        }
    });
    DataFactory.getRapex(rapexOecd).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsOecd = [];
        $scope.dataOecd = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsOecd.push(result);
                $scope.dataOecd.push(results[result]);
            }
        }
    });
    DataFactory.getRapex(rapexOriginCountry).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsOriginCountry = [];
        $scope.dataOriginCountry = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsOriginCountry.push(result);
                $scope.dataOriginCountry.push(results[result]);
            }
        }
    });
    DataFactory.getRapex(rapexProductType).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsProductType = [];
        $scope.dataProductType = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsProductType.push(result);
                $scope.dataProductType.push(results[result]);
            }
        }
    });
    DataFactory.getRapex(rapexProductsFound).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsProductsFound = [];
        $scope.dataProductsFound = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsProductsFound.push(result);
                $scope.dataProductsFound.push(results[result]);
            }
        }
    });
    DataFactory.getRapex(rapexRiskLevel).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsRiskLevel = [];
        $scope.dataRiskLevel = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsRiskLevel.push(result);
                $scope.dataRiskLevel.push(results[result]);
            }
        }
    });
    DataFactory.getRapex(rapexRiskType).then(function (response) {
        var results, result;

        // Initialize empty labels & data array
        $scope.labelsRiskType = [];
        $scope.dataRiskType = [];

        results = response.data.aggregations.results;

        // Convert response to labels & data array
        for (result in results) {
            if (results.hasOwnProperty(result)) {
                $scope.labelsRiskType.push(result);
                $scope.dataRiskType.push(results[result]);
            }
        }
    });
    
    /*
    |--------------------------------------------------------------------------
    |
    | Word Cloud (tagcanvas)
    |
    |--------------------------------------------------------------------------
    */
    
    $scope.showCloud = 'chemical';
    
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