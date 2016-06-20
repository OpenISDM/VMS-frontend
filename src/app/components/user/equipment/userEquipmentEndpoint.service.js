(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userEquipmentEndpoint', userEquipmentEndpoint);

  /** @ngInject */
  function userEquipmentEndpoint($log, $http, apiBaseUrl) {
    var service = {
      getAll: getAll,
      update: update,
      getCandidatedKeywords: getCandidatedKeywords
    };

    return service;

    function getAll() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/equipment',
      });
    }

    function update(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/equipment',
        data: data
      });
    }

    function getCandidatedKeywords(keyword) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/equipment_candidates/' + keyword
      });
    }
  }

})();
