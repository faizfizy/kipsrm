/*global angular*/
var tagcanvasDirective = angular.module('tagcanvasDirective', []);

tagcanvasDirective.directive('tagCanvas', function ($timeout) {
    'use strict';
    
    return {
        restrict: "A",
        scope: {
            canvasId: "@",
            outlineColour: "@",
            reverse: "@",
            depth: "@",
            maxSpeed: "@",
            textFont: "@",
            textColour: "@",
            weightMode: "@",
            weight: "@"
        },
        link: function (scope, element) {
            $timeout(function () {
                element.tagcanvas({
                    outlineColour: scope.outlineColour,
                    reverse: scope.reverse,
                    depth: scope.depth,
                    maxSpeed: scope.maxSpeed,
                    textFont: scope.textFont,
                    weightMode: scope.weightMode,
                    weight: scope.weight
                }, scope.canvasId);
            }, 1000);
        }
    };
});