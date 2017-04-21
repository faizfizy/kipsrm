/*global angular*/
var highlightDirective = angular.module('highlightDirective', []);

highlightDirective.directive('highlight', function () {
    'use strict';

    return {
        restrict: 'E',
        scope: {
            text: '=',
            search: '='
        },
        link: function link(scope, $element, attr) {

            var text = scope.text,
                search = scope.search;

            for (var i = 0; i < search.length; i++) {
                var s = search[i];
                var html = '<span class=' + s.type + '>$&</span>';

                text = text.replace(new RegExp("\\b" + s.name + "\\b"), html);
            }
            $element.html(text);
        }
    }
});