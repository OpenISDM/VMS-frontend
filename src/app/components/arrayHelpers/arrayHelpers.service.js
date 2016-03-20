(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('arrayHelpersService', arrayHelpersService);

  function arrayHelpersService() {
    var service = {
      getExistingIndexes: getExistingIndexes
    };

    function getExistingIndexes(origin, update) {
      var existingIndexes = [];

      angular.forEach(origin, function(value) {
        var index = update.indexOf(value);

        if (index !== -1) {
          existingIndexes.push(index);
        }
      });

      return existingIndexes;
    }

    return service;
  }
})();
