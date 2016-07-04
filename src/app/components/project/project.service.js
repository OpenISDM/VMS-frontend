(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('project', project);

  /** @ngInject */
  function project(
    $log,
    $q,
    projectEndpoint,
    alertMessage) {
    var service = {
      getById: getById,
      getAll: getAll,
      getManagedProjectList: getManagedProjectList,
      update: update,
      getHyperlinks: getHyperlinks,
      storeHyperlinks: storeHyperlinks,
      deleteHyperlinks: deleteHyperlinks,
      createOrUpdateHyperlinks: createOrUpdateHyperlinks
    };

    return service;

    function getById(id) {
      var deferred = $q.defer();

      projectEndpoint
        .getById(id)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var alert = alertMessage.convertToDanger(response.data);

          deferred.reject(alert);
        })

      return deferred.promise;
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

    function getManagedProjectList() {
      var deferred = $q.defer();

      projectEndpoint
        .getManagedProjectList()
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var alert = alertMessage.convertToDanger(response.data);

          deferred.reject(alert);
        });

      return deferred.promise;
    }

    function update(data) {
      var deferred = $q.defer();

      projectEndpoint
        .update(data.id, data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var alert = alertMessage.convertToDanger(response.data);

          deferred.reject(alert);
        });

      return deferred.promise;
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
