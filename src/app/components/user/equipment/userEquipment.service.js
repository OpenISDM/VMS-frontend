(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userEquipment', userEquipment);

  /** @ngInject */
  function userEquipment($log, $q, userEquipmentEndpoint) {
    var service = {
      getAll: getAll,
      update: update,
      getCandidatedKeywords: getCandidatedKeywords
    };

    return service;

    function getAll() {
      var deferred = $q.defer();

      userEquipmentEndpoint
        .getAll()
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.resolve(response.data);
        });

      return deferred.promise;
    }

    function update(values, existingIndexes) {
      var deferred = $q.defer();

      var equipment = [];

      angular.forEach(values, function(value) {
        equipment.push(value.name);
      });

      var data = {
        'equipment': equipment,
        'existing_equipment_indexes': existingIndexes
      };

      userEquipmentEndpoint
        .update(data)
        .then(function(response) {
          deferred.resolve();
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function getCandidatedKeywords(keyword) {
      var deferred = $q.defer();

      userEquipmentEndpoint
        .getCandidatedKeywords(keyword)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }
  }

})();
