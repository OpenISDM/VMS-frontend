(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectCustomFieldEndpoint', projectCustomFieldEndpoint);

  /** @ngInject */
  function projectCustomFieldEndpoint(
    $log,
    $http,
    config
  ) {
    var apiBaseUrl = config.apiBaseUrl;
    var service = {
      getAllByProjectId: getAllByProjectId,
      getMemberDataByProjectId: getMemberDataByProjectId,
      storeOrUpdateByProjectId: storeOrUpdateByProjectId,
      storeOrUpdateMemberDataByProjectId: storeOrUpdateMemberDataByProjectId
    };

    return service;

    function getAllByProjectId(projectId) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + projectId + '/custom_fields'
      });
    }

    function getMemberDataByProjectId(projectId) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + projectId + '/members/custom_field_data'
      });
    }

    function storeOrUpdateByProjectId(data, projectId) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/custom_fields',
        data: data
      });
    }

    function storeOrUpdateMemberDataByProjectId(data, projectId) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/members/bulk_custom_field_data',
        data: data
      });
    }
  }
})();
