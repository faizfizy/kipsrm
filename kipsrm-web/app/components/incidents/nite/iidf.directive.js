var iidfDirective = angular.module('iidfDirective', []);
iidfDirective.directive('iidfGraph', function() {
    'use strict';

    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            options: '='
        },
        replace: true,
        link: function(scope, element) {
            Highcharts.setOptions({
                global: {
                    useUTC: false
                }
            });
            var chart = undefined;
            scope.$watch("options", function(newValue, oldValue) {

                if (newValue !== undefined && newValue.length != 0) {
                    if (chart !== undefined) {}
                    // console.log(newValue);
                    chart = new Highcharts.stockChart(element[0], newValue);
                }
            });
        }

    }
});
