(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('projectCustomField', projectCustomField);

  /** @ngInject */
  function projectCustomField(
    $log,
    $q,
    projectCustomFieldEndpoint,
    alertMessage
  ) {
    var service = {
      getAllByProjectId: getAllByProjectId,
      getMemberDataByProjectId: getMemberDataByProjectId,
      storeOrUpdateByProjectId: storeOrUpdateByProjectId,
      storeOrUpdateMemberDataByProjectId: storeOrUpdateMemberDataByProjectId
    };

    return service;

    function getAllByProjectId(projectId) {
      var deferred = $q.defer();

      projectCustomFieldEndpoint
        .getAllByProjectId(projectId)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var value = response.data;
          var errors = value.errors;
          var alerts;

          if (response.status === 422) {
            alerts = alertMessage.convertToValidationDanger(errors);
          } else {
            alerts = alertMessage.convertToDanger(errors);
          }

          deferred.reject(alerts);
        });

      return deferred.promise;
    }

    function getMemberDataByProjectId(projectId) {
      var deferred = $q.defer();

      projectCustomFieldEndpoint
        .getMemberDataByProjectId(projectId)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var value = response.data;
          var errors = value.errors;
          var alerts;

          if (response.status === 422) {
            alerts = alertMessage.convertToValidationDanger(errors);
          } else {
            alerts = alertMessage.convertToDanger(errors);
          }

          deferred.reject(alerts);
        });

      return deferred.promise;
    }

    function storeOrUpdateByProjectId(data, projectId) {
      var deferred = $q.defer();

      projectCustomFieldEndpoint
        .storeOrUpdateByProjectId(data, projectId)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var value = response.data;
          var errors = value.errors;
          var alerts;

          if (response.status === 422) {
            alerts = alertMessage.convertToValidationDanger(errors);
          } else {
            alerts = alertMessage.convertToDanger(errors);
          }

          deferred.reject(alerts);
        });

      return deferred.promise;
    }

    function storeOrUpdateMemberDataByProjectId(data, projectId) {
      var deferred = $q.defer();

      projectCustomFieldEndpoint
        .storeOrUpdateMemberDataByProjectId(data, projectId)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var value = response.data;
          var errors = value.errors;
          var alerts;

          if (response.status === 422) {
            alerts = alertMessage.convertToValidationDanger(errors);
          } else {
            alerts = alertMessage.convertToDanger(errors);
          }

          deferred.reject(alerts);
        });

      return deferred.promise;
    }
  }
})();
