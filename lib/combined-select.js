angular.module('combined-select', []);

angular.module('combined-select').directive(
        'selector',
        [ function() {
            return {
                restrict : 'E',
                template : '<div ng-show="max_btn_value > value || max_btn_value == max" class="combined-select">'
                        + '<label ng-repeat="v in btn_values" class="btn label-radio-picker" ng-class="{active : $parent.value=={{v}}}">'
                        + '<input name="s_{{name}}" ng-model="$parent.value" ng-value="{{v}}" type="radio">' + '{{$last && max != v ? v + "+" : v }}'
                        + '</label>' + '</div>' + '<div ng-hide="max_btn_value > value || max_btn_value == max">'
                        + '<select selectpicker class="form-control" ng-model="value" ng-options="v as v for v in values" collection-name="values"></select>' + '</div>',
                require : [ 'ngModel' ],
                scope : {
                    min : '=sMin',
                    max : '=sMax',
                    step : '=sStep',
                    buttons : '=sButtons',
                    name : '@sname',
                    modelValue : '=ngModel',
                },
                controller : function($scope, $element, $attrs, $transclude) {
                    $scope.value = $scope.modelValue;
                    $scope.first_change = true;

                    $scope.$watch("value", function() {
                        if ($scope.first_change && $scope.modelValue) {
                            $scope.value = $scope.modelValue;
                            $scope.first_change = false;
                        } else {
                            $scope.modelValue = $scope.value;

                        }

                    });
                },
                compile : function(tElement, tAttrs) {
                    // Compile

                    return {

                        pre : function(scope, iElement, iAttrs, controller, transcludeFn)

                        {
                            var num_btns = (scope.buttons * 1), step = (scope.step * 1), min = (scope.min * 1), max = (scope.max * 1);

                            var btn_values = new Array();
                            var values = new Array();

                            for ( var i = min; i <= max; i += step) {
                                if (btn_values.length < num_btns) {
                                    btn_values.push(i);
                                }
                                values.push(i);
                            }

                            var max_btn_value = btn_values[btn_values.length - 1];
                            scope.btn_values = btn_values;
                            scope.values = values;
                            scope.max_btn_value = max_btn_value;
                            scope.value = values[0];
                        },

                        post : function(scope, iElement, iAttrs, controller, transcludeFn) {
                        }
                    };
                }
            };
        } ]);
