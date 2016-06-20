(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userExperience', userExperience);

  /** @ngInject */
  function userExperience($log, $q, userExperienceEndpoint) {
    var service = {
      create: create,
      getAll: getAll,
      update: update,
      dropById: dropById,
    };

    return service;

    function create(data) {
      var deferred = $q.defer();

      userExperienceEndpoint
        .create(data)
        .then(function() {
          deferred.resolve();
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function getAll() {
      var deferred = $q.defer();

      userExperienceEndpoint
        .getAll()
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function update(data) {
      var deferred = $q.defer();

      userExperienceEndpoint
        .update(data)
        .then(function() {
          deferred.resolve();
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function dropById(id) {
      var deferred = $q.defer();

      userExperienceEndpoint
        .dropById(id)
        .then(function() {
          deferred.resolve();
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }
  }

})();
