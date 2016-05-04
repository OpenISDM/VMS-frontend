(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('permissionText', permissionText);

  /** @ngInject */
  function permissionText($log, PERMISSION_OPTIONS) {
    var filter = function(input) {
      var value = null;

      angular.forEach(PERMISSION_OPTIONS, function(item) {
        $log.debug(item);
        $log.debug(input);

        if (item.value == input) {
          value = item.name;
        }
      });

      return value;
    };

    return filter;
  }
})();
