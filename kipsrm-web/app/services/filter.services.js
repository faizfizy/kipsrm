/*global angular*/
var app = angular.module('filterFactories', ['CONSTANTS']);

app.factory('NiteFilterFactory', ['$http', 'CONSTANT', function($http, CONSTANT) {
    "use strict";

    var url = CONSTANT.BASE_URL + "nite",
        header = {
            headers: {
                'REMOTE_USER': 'AABBCC112233'
            }
        },

        // Host
        niteAge = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "age"
            }]
        },
        niteGender = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "gender"
            }]
        },
        niteRegion = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "region"
            }]
        },

        // Vector
        niteProductName = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "product_name.keyword"
            }]
        },
        niteProductModel = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "product_model.keyword"
            }]
        },
        niteProductManufacturer = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "product_manufacturer.keyword"
            }]
        },

        // Agent
        niteHazard = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "hazard"
            }]
        },
        niteCauseCode = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "incident_cause_code"
            }]
        },
        niteMechanism = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "mechanism"
            }]
        },
        niteFireInvolvement = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "fireInvolved"
            }]
        },

        // Environment
        nitePlace = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "placeOfOccurence"
            }]
        },
        niteActivity = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "activity"
            }]
        },
        niteWeather = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "weather"
            }]
        },

        // Consequences
        niteDamageType = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "damage_type"
            }]
        },
        niteInjuredPart = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "injuredPart"
            }]
        },
        niteInjuryType = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "injuryType"
            }]
        },
        nitePrevention = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "prevention.keyword"
            }]
        },

        // Other
        niteMaterial = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "material"
            }]
        },

        filterFactory = {};

    /*
    |--------------------------------------------------------------------------
    | Factory function
    |--------------------------------------------------------------------------
    */

    // Host    
    filterFactory.getNiteAge = function() {
        return $http.post(url, niteAge);
    };
    filterFactory.getNiteGender = function() {
        return $http.post(url, niteGender);
    };
    filterFactory.getNiteRegion = function() {
        return $http.post(url, niteRegion);
    };

    // Vector
    filterFactory.getNiteProductName = function() {
        return $http.post(url, niteProductName);
    };
    filterFactory.getNiteProductModel = function() {
        return $http.post(url, niteProductModel);
    };
    filterFactory.getNiteProductManufacturer = function() {
        return $http.post(url, niteProductManufacturer);
    };

    // Agent
    filterFactory.getNiteHazard = function() {
        return $http.post(url, niteHazard);
    };
    filterFactory.getNiteCauseCode = function() {
        return $http.post(url, niteCauseCode);
    };
    filterFactory.getNiteMechanism = function() {
        return $http.post(url, niteMechanism);
    };
    filterFactory.getNiteFireInvolvement = function() {
        return $http.post(url, niteFireInvolvement);
    };

    // Environment
    filterFactory.getNitePlace = function() {
        return $http.post(url, nitePlace);
    };
    filterFactory.getNiteActivity = function() {
        return $http.post(url, niteActivity);
    };
    filterFactory.getNiteWeather = function() {
        return $http.post(url, niteWeather);
    };

    // Consequences
    filterFactory.getNiteDamageType = function() {
        return $http.post(url, niteDamageType);
    };
    filterFactory.getNiteInjuredPart = function() {
        return $http.post(url, niteInjuredPart);
    };
    filterFactory.getNiteInjuryType = function() {
        return $http.post(url, niteInjuryType);
    };
    filterFactory.getNitePrevention = function() {
        return $http.post(url, nitePrevention);
    };

    // Other
    filterFactory.getNiteMaterial = function() {
        return $http.post(url, niteMaterial);
    };

    /*
    |--------------------------------------------------------------------------
    | Checked Filter
    |--------------------------------------------------------------------------
    */

    // Host
    filterFactory.niteAgeChecked = [];
    filterFactory.niteGenderChecked = [];
    filterFactory.niteRegionChecked = [];

    // Vector
    filterFactory.niteProductNameChecked = [];
    filterFactory.niteProductModelChecked = [];
    filterFactory.niteProductManufacturerChecked = [];

    // Agent
    filterFactory.niteHazardChecked = [];
    filterFactory.niteCauseCodeChecked = [];
    filterFactory.niteMechanismChecked = [];
    filterFactory.niteFireInvolvementChecked = [];

    // Environment
    filterFactory.nitePlaceChecked = [];
    filterFactory.niteActivityChecked = [];
    filterFactory.niteWeatherChecked = [];

    // Consequences
    filterFactory.niteDamageTypeChecked = [];
    filterFactory.niteInjuredPartChecked = [];
    filterFactory.niteInjuryTypeChecked = [];
    filterFactory.nitePreventionChecked = [];

    // Other
    filterFactory.niteMaterialChecked = [];

    // Reset Filter
    filterFactory.resetFilter = function() {

        // Host
        filterFactory.niteAgeChecked = [];
        filterFactory.niteGenderChecked = [];
        filterFactory.niteRegionChecked = [];

        // Vector
        filterFactory.niteProductNameChecked = [];
        filterFactory.niteProductModelChecked = [];
        filterFactory.niteProductManufacturerChecked = [];

        // Agent
        filterFactory.niteHazardChecked = [];
        filterFactory.niteCauseCodeChecked = [];
        filterFactory.niteMechanismChecked = [];
        filterFactory.niteFireInvolvementChecked = [];

        // Environment
        filterFactory.nitePlaceChecked = [];
        filterFactory.niteActivityChecked = [];
        filterFactory.niteWeatherChecked = [];

        // Consequences
        filterFactory.niteDamageTypeChecked = [];
        filterFactory.niteInjuredPartChecked = [];
        filterFactory.niteInjuryTypeChecked = [];
        filterFactory.nitePreventionChecked = [];

        // Other
        filterFactory.niteMaterialChecked = [];
    };

    return filterFactory;
}]);

app.factory('RapexFilterFactory', ['$http', 'CONSTANT', function($http, CONSTANT) {
    "use strict";

    var url = CONSTANT.BASE_URL + "rapex",
        header = {
            headers: {
                'REMOTE_USER': 'AABBCC112233'
            }
        },

        // Request body
        rapexCategory = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "category.keyword"
            }]
        },
        rapexNotifyingCountry = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "notifying_country.keyword"
            }]
        },
        rapexOecd = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "oecd_por_cat.keyword"
            }]
        },
        rapexOriginCountry = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "origin_country.keyword"
            }]
        },
        rapexProductType = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "product_type.keyword"
            }]
        },
        rapexProductsFound = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "products_found.keyword"
            }]
        },
        rapexRiskLevel = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "risk_level.keyword"
            }]
        },
        rapexRiskType = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "risk_type.keyword"
            }]
        },
        rapexEuStandard = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "euStandard",
                "size": 9999
            }]
        },
        rapexChem = {
            "aggregations": [{
                "name": "result",
                "type": "terms",
                "field": "chemical",
                "size": 9999
            }]
        },
        filterFactory = {};

    /*
    |--------------------------------------------------------------------------
    | Factory function
    |--------------------------------------------------------------------------
    */

    filterFactory.getRapexCategory = function() {
        return $http.post(url, rapexCategory);
    };
    filterFactory.getRapexNotifyingCountry = function() {
        return $http.post(url, rapexNotifyingCountry);
    };
    filterFactory.getRapexOecd = function() {
        return $http.post(url, rapexOecd);
    };
    filterFactory.getRapexOriginCountry = function() {
        return $http.post(url, rapexOriginCountry);
    };
    filterFactory.getRapexProductType = function() {
        return $http.post(url, rapexProductType);
    };
    filterFactory.getRapexProductsFound = function() {
        return $http.post(url, rapexProductsFound);
    };
    filterFactory.getRapexRiskLevel = function() {
        return $http.post(url, rapexRiskLevel);
    };
    filterFactory.getRapexRiskType = function() {
        return $http.post(url, rapexRiskType);
    };
    filterFactory.getEuStandard = function() {
        return $http.post(url, rapexEuStandard);
    };
    filterFactory.getChem = function() {
        return $http.post(url, rapexChem);
    };

    /*
    |--------------------------------------------------------------------------
    | Checked Filter
    |--------------------------------------------------------------------------
    */

    filterFactory.rapexCategoryChecked = [];
    filterFactory.rapexNotifyingCountryChecked = [];
    filterFactory.rapexOecdChecked = [];
    filterFactory.rapexOriginCountryChecked = [];
    filterFactory.rapexProductTypeChecked = [];
    filterFactory.rapexProductsFoundChecked = [];
    filterFactory.rapexRiskLevelChecked = [];
    filterFactory.rapexRiskTypeChecked = [];
    filterFactory.euStandard = [];
    filterFactory.chem = [];

    // Reset Filter
    filterFactory.resetFilter = function() {
        filterFactory.rapexCategoryChecked = [];
        filterFactory.rapexNotifyingCountryChecked = [];
        filterFactory.rapexOecdChecked = [];
        filterFactory.rapexOriginCountryChecked = [];
        filterFactory.rapexProductTypeChecked = [];
        filterFactory.rapexProductsFoundChecked = [];
        filterFactory.rapexRiskLevelChecked = [];
        filterFactory.rapexRiskTypeChecked = [];
        filterFactory.euStandard = [];
        filterFactory.chem = [];

    };

    return filterFactory;
}]);
