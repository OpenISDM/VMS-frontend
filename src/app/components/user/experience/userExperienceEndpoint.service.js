(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userExperienceEndpoint', userExperienceEndpoint);

  /** @ngInject */
  function userExperienceEndpoint($log, $http, apiBaseUrl) {
    var service = {
      create: create,
      getAll: getAll,
      update: update,
      dropById: dropById,
    };

    return service;

    function create(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/experiences',
        data: data
      });
    }

    function getAll() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/experiences',
      });
    }

    function update(data) {
      return $http({
        method: 'PUT',
        url: apiBaseUrl + '/users/me/experiences',
        data: data
      });
    }

    function dropById(id) {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/users/me/experiences/' + id
      });
    }
  }

})();
