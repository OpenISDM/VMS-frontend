(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('project', project);

  /** @ngInject */
  function project($log, $q, projectEndpoint) {
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
      var deferred = $q.defer();

      projectEndpoint
        .getAll()
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
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
