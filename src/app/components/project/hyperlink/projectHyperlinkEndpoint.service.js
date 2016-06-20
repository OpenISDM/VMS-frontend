(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectHyperlinkEndpoint', projectHyperlinkEndpoint);

  /** @ngInject */
  function projectHyperlinkEndpoint($log, $http, apiBaseUrl) {
    var service = {
      get: get,
      create: create,
      drop: drop,
      createOrUpdate: createOrUpdate
    };

    return service;

    function get(projectId) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks'
      });
    }

    function create(projectId, data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks',
        data: data
      });
    }

    function drop(projectId, id) {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks/' + id
      });
    }

    function createOrUpdate(projectId, data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks/create_or_update_bulk',
        data: data
      });
    }
  }
})();
