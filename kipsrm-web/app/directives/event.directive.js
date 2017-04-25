/*global angular*/
var eventDirective = angular.module('eventDirective', []);

eventDirective.directive('eventDrop', function() {
    return {
        restrict: 'A',
        template: '<div id="lul" >  <svg style="width: 90%; height:2050px;"> </svg> </div>',
        scope: {
            options: '='
        },
        link: function(scope, element) {
            console.log("eventdropdirective");
            scope.$watch("options", function(newValue, oldValue) {
                if (newValue !== undefined && newValue.length != 0) {
                    render(newValue);
                }
            });

            var render = function(newvalue) {
                var color = d3.scale.category20c();

                var result = _.chain(newvalue).groupBy('region').toPairs().map(function(pair) {
                    return _.zipObject(['name', 'data'], pair);

                }).value();


                var data = result;
                var removeIndex = data.map(function(item) {
                        return item.name; })
                    .indexOf("不明");

                ~removeIndex && data.splice(removeIndex, 1);
                                console.log(data);

                var eventDropsChart = d3.chart.eventDrops()
                    .eventColor(function(d) {
                        return color(d.region);
                    })
                    .date(function(d) {
                        return new Date(d.incident_date);
                    })
                    .start(
                        new Date(2007, 4, 1)
                    )
                    .end(
                        new Date(2015, 6, 1)
                    );
                d3.select("svg")
                    .datum(data)
                    .call(eventDropsChart);
            }
        }
    };
})
