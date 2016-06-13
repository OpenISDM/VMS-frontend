(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('project', project);

  /** @ngInject */
  function project(vmsClient, projectEndpoint, $q, $log) {
    var service = {
      getManagedProjects: getManagedProjects,
      getHyperlinks: getHyperlinks,
      storeHyperlinks: storeHyperlinks
    };

    return service;

    function getManagedProjects() {
      var deferred = $q.defer();
      var onSuccess = function() {};
      var onFailure = function() {};

      vmsClient.getManagedProjects().then().catch()
    }

    function getHyperlinks(projectId) {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug(response);

        deferred.resolve(response);
      };

      var onFailure = function(response) {
        $log.debug(response);

        deferred.resolve(response);
      }

      projectEndpoint.getHyperlinks(projectId)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function storeHyperlinks(projectId) {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug(response);

        deferred.resolve(response);
      };
      var onFailure = function(response) {
        $log.debug(response);

        deferred.reject(response);
      };

      projectEndpoint.storeHyperlinks(projectId)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }
  }
})();
