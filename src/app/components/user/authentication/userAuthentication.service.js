(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userAuthentication', userAuthentication);

  /** @ngInject */
  function userAuthentication(
    $log,
    $q,
    $rootScope,
    $timeout,
    userAuthenticationEndpoint,
    authPrinciple,
    vmsLocalStorage,
    BROADCAST_EVENTS_LIST) {
    var authenticated = false;
    var currentRole = 'volunteer';
    var service = {
      login: login,
      logout: logout,
      refreshToken: refreshToken,
      verifyEmail: verifyEmail,
      isAuthenticated: isAuthenticated,
      switchRole: switchRole,
      getRole: getRole,
      authorize: authorize
    };

    return service;

    function login(credentials, role) {
      var deferred = $q.defer();

      userAuthenticationEndpoint
        .login(credentials)
        .then(function(response) {
          $log.debug('login success');
          $log.debug(response.headers('Authorization'));

          var jsonWebToken = response.headers('Authorization');
          var value = response.data;

          if (angular.isDefined(jsonWebToken)) {
            authenticated = true;

            $log.debug(value);
            $log.debug('avatar_url = ' + value.data.avatar_url);

            // Store JSON Web Token into local storage for attching into each request
            vmsLocalStorage.setJwt(jsonWebToken);

            // Store username into local storage for displaying username on navbar
            vmsLocalStorage.setUsername(value.data.username);

            // Store last name into local storage for display last name on navbar
            vmsLocalStorage.setLastName(value.data.last_name);

            // Store avatar path into local storage for displaying avatar image on navbar
            vmsLocalStorage.setAvatarPath(value.data.avatar_url);

            // Switch into role
            switchRole(role);

            // broadcast an event, there is a registered listener,
            // it will handle the event
            $rootScope.$broadcast(BROADCAST_EVENTS_LIST.AUTHENTICATED_SUCCESS_EVENT);

            deferred.resolve();
          }
        })
        .catch(function(response) {
          $log.debug('login error');

          logout();

          deferred.reject(response);
        });

      return deferred.promise;
    }

    function logout() {
      authenticated = false;

      clearAllLocalStorageKeys();
    }

    function refreshToken() {
      var deferred = $q.defer();

      userAuthenticationEndpoint
        .refreshToken()
        .then(function(response) {
          var jsonWebToken = response.headers('Authorization');

          if (angular.isDefined(jsonWebToken) && jsonWebToken != null) {
            vmsLocalStorage.setJwt(jsonWebToken);

            deferred.resolve(jsonWebToken);
          } else {
            deferred.reject();
          }
        })
        .catch(function(response) {
          logout();

          deferred.reject();
        });

      return deferred.promise;
    }

    function verifyEmail(email, token) {
      var deferred = $q.defer();

      userAuthenticationEndpoint
        .verifyEmail(email, token)
        .then(function(response) {
          var value = response.data;

          deferred.resolve(value);
        })
        .catch(function(response) {
          deferred.reject(response);
        });

      return deferred.promise;
    }

    function isAuthenticated() {
      return authenticated;
    }

    function switchRole(role) {
      vmsLocalStorage.setRole(role);

      currentRole = role;
    }

    function getRole() {
      return currentRole;
    }

    function authorize() {
      var deferred = $q.defer();

      $timeout(function() {
        if (authPrinciple.identity()) {
          authenticated = true;
          deferred.resolve();
        } else {
          authenticated = false;
          deferred.reject();
        }
      }, 500);

      return deferred.promise;
    }

    function clearAllLocalStorageKeys() {
      vmsLocalStorage.removeLastName();
      vmsLocalStorage.removeUsername();
      vmsLocalStorage.removeJwt();
      vmsLocalStorage.removeRole();
      vmsLocalStorage.removeAvatarPath();
    }
  }

})();
