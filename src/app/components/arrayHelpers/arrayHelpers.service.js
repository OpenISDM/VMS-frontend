(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('arrayHelpersService', arrayHelpersService);

  function arrayHelpersService(
    $log,
    lodash
  ) {
    var service = {
      getExistingIndexes: getExistingIndexes
    };

    function getExistingIndexes(origin, update) {
      $log.debug('getExistingIndexes');
      $log.debug(origin);
      $log.debug(update);

      var existingIndexes = [];

      angular.forEach(origin, function(value) {
        $log.debug('value');
        $log.debug(value);

        var index = lodash.findIndex(update, function(item) {
          return item.name == value.name;
        });

        $log.debug('index');
        $log.debug(index);

        console.log('index');
        console.log(index);

        if (index != -1) {
          $log.debug('found');
          $log.debug(index);
          existingIndexes.push(index);
        }
      });

      return existingIndexes;
    }

    return service;
  }
})();
