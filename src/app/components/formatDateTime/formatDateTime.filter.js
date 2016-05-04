(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('formatDateTime', formatDateTime);

  /** @ngInject */
  function formatDateTime($filter, $log) {
    var filter = function(dateString) {
      var dateValue = new Date(dateString);
      var transformedInput = $filter('date')(dateValue, 'yyyy/MM/dd hh:mm', 'UTC');

      $log.debug('=== formatDateTime directive ===');
      $log.debug(transformedInput);

      return transformedInput;
    };

    return filter;
  }
})();
