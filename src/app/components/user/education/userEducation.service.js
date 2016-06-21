(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userEducation', userEducation);

  /** @ngInject */
  function userEducation($log, $q, userEducationEndpoint) {
    var service = {
      create: create,
      getAll: getAll,
      update: update,
      dropById: dropById,
    };

    return service;

    function create(data) {
      var deferred = $q.defer();

      userEducationEndpoint
        .create(data)
        .then(function(response) {
          $log.debug('create an education successfully');

          deferred.resolve(response.data);
        })
        .catch(function(response) {
          $log.error('failed to create an education');

          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function getAll() {
      var deferred = $q.defer();

      userEducationEndpoint
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

      userEducationEndpoint
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

      userEducationEndpoint
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
