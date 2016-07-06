(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectCustomFieldEndpoint', projectCustomFieldEndpoint);

  /** @ngInject */
  function projectCustomFieldEndpoint(
    $log,
    $http,
    apiBaseUrl
  ) {
    var service = {
      getAllByProjectId: getAllByProjectId,
      storeOrUpdateByProjectId: storeOrUpdateByProjectId
    };

    return service;

    function getAllByProjectId(projectId) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + projectId + '/custom_fields'
      });
    }

    function storeOrUpdateByProjectId(data, projectId) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/custom_fields',
        data: data
      });
    }
  }
})();
