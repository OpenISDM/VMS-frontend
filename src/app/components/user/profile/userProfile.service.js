(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userProfile', userProfile);

  /** @ngInject */
  function userProfile($log, $q, userProfileEndpoint, vmsLocalStorage) {
    var service = {
      create: create,
      get: get,
      update: update,
      drop: drop,
      getAttendingProjects: getAttendingProjects
    };

    $log.debug('userProfile');

    return service;

    function create(user, role) {
      var deferred = $q.defer();

      userProfileEndpoint
        .create(user)
        .then(function(response) {
          var data = response.data;

          $log.debug(data);

          vmsLocalStorage.setUsername(data.username);
          vmsLocalStorage.setJwt(data.auth_access_token);

          switch (role) {
            case 'volunteer':
              vmsLocalStorage.setRole('volunteer');
              break;
          }

          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function get() {
      var deferred = $q.defer();

      userProfileEndpoint
        .get()
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

      userProfileEndpoint
        .update(data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function drop(credentials) {
      var deferred = $q.defer();

      userProfileEndpoint
        .drop(credentials)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function getAttendingProjects(id) {
      var deferred = $q.defer();

      userProfileEndpoint
        .getAttendingProjects(id)
        .then(function(response) {
          deferred.resolve(response.data.data);
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }
  }

})();
