(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectEndpoint', projectEndpoint);

  /** @ngInject */
  function projectEndpoint($log, $http, apiBaseUrl) {
    var service = {
      getById: getById,
      getAll: getAll,
      update: update,
      getHyperlinks: getHyperlinks,
      storeHyperlinks: storeHyperlinks,
      deleteHyperlinks: deleteHyperlinks,
      createOrUpdateHyperlinks: createOrUpdateHyperlinks
    };

    return service;

    function getById(id) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + id,
      });
    }

    function getAll() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects'
      });
    }

    function update(id, data) {
      return $http({
        method: 'PUT',
        url: apiBaseUrl + '/projects/' + id,
        data: data
      });
    }

    function getHyperlinks(projectId) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks'
      });
    }

    function storeHyperlinks(projectId, data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks',
        data: data
      });
    }

    function deleteHyperlinks(projectId, hyperlinkId) {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks/' + hyperlinkId
      });
    }

    function createOrUpdateHyperlinks(projectId, data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/projects/' + projectId + '/hyperlinks/create_or_update_bulk',
        data: data
      });
    }
  }
})();
