(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectHyperlink', projectHyperlink);

  /** @ngInject */
  function projectHyperlink($log, $q, projectHyperlinkEndpoint) {
    var service = {
      getByProjectId: getByProjectId,
      create: create,
      dropByProjectIdAndHyperlinkId: dropByProjectIdAndHyperlinkId,
      createOrUpdate: createOrUpdate
    };

    return service;

    function getByProjectId(projectId) {
      var deferred = $q.defer();

      projectHyperlinkEndpoint
        .getByProjectId(projectId)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function create(projectId, data) {
      var deferred = $q.defer();

      projectHyperlinkEndpoint
        .create(projectId, data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.resolve(response);
        });

      return deferred.promise;
    }

    function dropByProjectIdAndHyperlinkId(projectId, hyperlinkId) {
      var deferred = $q.defer();

      projectHyperlinkEndpoint
        .dropByProjectIdAndHyperlinkId(projectId, hyperlinkId)
        .then(function() {
          deferred.resolve();
        })
        .catch(function() {
          deferred.reject();
        });

      return deferred.promise;
    }

    function createOrUpdate(projectId, createdHyperlinks, updatedHyperlinks) {
      var deferred = $q.defer();
      var data = {};

      if (angular.isDefined(createdHyperlinks)
        && createdHyperlinks.length > 0) {
        data['create'] = createdHyperlinks;
      }

      if (angular.isDefined(updatedHyperlinks)
        && updatedHyperlinks.length > 0) {
        data['update'] = updatedHyperlinks;
      }

      projectHyperlinkEndpoint
        .createOrUpdate(projectId)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }
  }
})();
