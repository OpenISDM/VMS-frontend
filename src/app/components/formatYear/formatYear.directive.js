(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .directive('formatYear', formatYear);

    /** @ngInject */
    function formatYear($filter, $log) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {

                modelCtrl.$parsers.push(function(inputValue) {

                    var transformedInput = $filter('date')(inputValue, 'yyyy');

                    $log.debug('=== formatYear directive ===');
                    $log.debug(transformedInput);

                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    }
})();