(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userEducationEndpoint', userEducationEndpoint);

  /** @ngInject */
  function userEducationEndpoint($log, $http, apiBaseUrl) {
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
        url: apiBaseUrl + '/users/me/educations',
        data: data
      });
    }

    function getAll() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/educations',
      });
    }

    function update(data) {
      return $http({
        method: 'PUT',
        url: apiBaseUrl + '/users/me/educations',
        data: data
      });
    }

    function dropById(id) {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/users/me/educations/' + educationId
      });
    }
  }

})();
