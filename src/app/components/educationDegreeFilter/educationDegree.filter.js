(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('educationDegree', educationDegree);

  /** @ngInject */
  function educationDegree(EDUCATION_DEGREES, $log) {
    var filter = function(input) {
      var degreeText;

      angular.forEach(EDUCATION_DEGREES, function(degree) {
        if (degree.value == input) {
          degreeText = degree.text;
        }
      });

      $log.debug(degreeText);

      return degreeText;
    };

    return filter;
  }
})();
