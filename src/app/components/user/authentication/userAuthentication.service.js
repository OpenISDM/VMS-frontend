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
    BROADCAST_EVENTS_LIST,
    alertMessage) {
    var authenticated = vmsLocalStorage.jwtExists();
    var currentRole;
    var service = {
      login: login,
      logout: logout,
      setAuthentication: setAuthentication,
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
          var errors;

          logout();

          if (response.status === 401) {
            errors = ['incorrect_username_or_password'];
          } else {
            errors = response.data.errors;
          }

          var alert = alertMessage.convertToDanger(errors);

          deferred.reject(alert);
        });

      return deferred.promise;
    }

    function logout() {
      $log.debug("authenticated was set into false");

      authenticated = false;

      clearAllLocalStorageKeys();
    }

    function setAuthentication(user, jwt, role) {
      authenticated = true;

      vmsLocalStorage.setUsername(user.username);
      vmsLocalStorage.setLastName(user.last_name);
      vmsLocalStorage.setJwt(jwt);
      vmsLocalStorage.setAvatarPath(user.avatar_url);
      switchRole(role);
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
          $log.error("refreshToken catch()");

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
      if (!angular.isDefined(currentRole)) {
        currentRole = vmsLocalStorage.getRole();
      }

      return currentRole;
    }

    function authorize() {
      var deferred = $q.defer();

      $timeout(function() {
        if (authPrinciple.identity()) {
          authenticated = true;
          deferred.resolve();
        } else {
          $log.debug("authenticated was set into false");

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
