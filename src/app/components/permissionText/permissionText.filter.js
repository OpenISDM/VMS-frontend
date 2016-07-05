(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('permissionText', permissionText);

  /** @ngInject */
  function permissionText($log, PERMISSION_OPTIONS) {
    $log.debug('permissionText');

    var filter = function(input) {
      var text = null;

      $log.debug(input);

      angular.forEach(PERMISSION_OPTIONS, function(item) {
        if (item.value == input) {
          text = item.name;
        }
      });

      $log.debug(text);

      return text;
    };

    return filter;
  }
})();
