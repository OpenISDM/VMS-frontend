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
      storeHyperlinks: storeHyperlinks,
      deleteHyperlinks: deleteHyperlinks,
      createOrUpdateHyperlinks: createOrUpdateHyperlinks
    };

    return service;

    function getManagedProjects() {
      var deferred = $q.defer();
      var onSuccess = function() {};
      var onFailure = function() {};

      vmsClient.getManagedProjects().then().catch()
    }

    function getHyperlinks(projectId) {
      $log.debug("projectHyperlink.get()");

      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug(response);

        deferred.resolve(response.data.data);
      };

      var onFailure = function(response) {
        $log.error(response);

        deferred.reject(response);
      }

      projectEndpoint.getHyperlinks(projectId)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function storeHyperlinks(projectId, data) {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug(response);

        deferred.resolve(response);
      };
      var onFailure = function(response) {
        $log.debug(response);

        deferred.reject(response);
      };

      projectEndpoint.storeHyperlinks(projectId, data)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function deleteHyperlinks(projectId, hyperlinkId) {
      var deferred = $q.defer();

      projectEndpoint.deleteHyperlinks(projectId, hyperlinkId)
        .then(function() {
          $log.debug("deleteHyperlinks success");

          deferred.resolve();
        })
        .catch(function(response) {
          $log.error("deleteHyperlinks failure");

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function createOrUpdateHyperlinks(projectId, newHyperlinks, updateHyperlinks) {
      var deferred = $q.defer();
      var data = {};

      if (angular.isDefined(newHyperlinks) && newHyperlinks.length > 0) {
        $log.debug("newHyperlinks is defined");
        $log.debug(newHyperlinks);

        data["create"] = newHyperlinks;
      }

      if (angular.isDefined(updateHyperlinks) && updateHyperlinks.length > 0) {
        $log.debug("updateHyperlinks is defined");
        $log.debug(updateHyperlinks);

        data["update"] = updateHyperlinks;
      }

      $log.debug("data");
      $log.debug(data);

      projectEndpoint.createOrUpdateHyperlinks(projectId, data)
        .then(function(response) {
          $log.debug(response);

          deferred.resolve(response.data);
        })
        .catch(function(response) {
          $log.error(response);

          deferred.reject(response);
        });

      return deferred.promise;
    }
  }
})();
