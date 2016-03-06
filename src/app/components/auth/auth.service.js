(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('auth', auth);

  /* @ngInject */
  function auth(authPrinciple, $q, $timeout, $log, vmsClient, vmsLocalStorage, $rootScope, BROADCAST_EVENTS_LIST) {
    var service = {
      authorize: authorize,
      isAuthenticated: isAuthenticated,
      logout: logout,
      authenticate: authenticate,
      refreshToken: refreshToken
    };

    var authenticated = false;

    return service;

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

    function isAuthenticated() {
      if (angular.isDefined(authenticated)) {
        return authenticated;
      }

      return vmsLocalStorage.jwtExists();
    }

    function logout() {
      authenticated = false;
      vmsLocalStorage.removeJwt();
    }

    function authenticate(credentials) {
      console.log('authenticate() ~');
      //var deferred = $q.defer();
      var successCallback = function(response) {
        $log.debug('login success');
        $log.debug(response);
        console.log('successCallback ~');


        var token = response.data.auth_access_token;

        if (angular.isDefined(token)) {
          authenticated = true;

          vmsLocalStorage.setJwt(token);
          vmsLocalStorage.setUsername(credentials.username);
          // broadcast an event, there is a registered listener,
          // it will handle the event
          $rootScope.$broadcast(BROADCAST_EVENTS_LIST.AUTHENTICATED_SUCCESS_EVENT);
        //deferred.resolve();
        }
      };
      var failureCallback = function(response) {
        $log.debug('login error');
        console.log('failureCallback ~');

        if (response.status === 401) {
          authenticated = false;
          $rootScope.$broadcast(BROADCAST_EVENTS_LIST.AUTHENTICATED_FAILURE_EVENT);
        // deferred.reject();
        }
      };

      vmsClient.httpLogin(credentials, successCallback, failureCallback);

    //return deferred.promise;
    }

    function refreshToken() {
      var deferred = $q.defer();
      var successCallback = function(response) {
        var token = response.headers('Authorization');

        if (angular.isDefined(token) && token != null) {
          var jwtToken = token.substring(7);

          vmsLocalStorage.setJwt(jwtToken);
          deferred.resolve(jwtToken);
        } else {
          outFailureCallback();
        }
      };
      var failureCallback = function(response) {
        deferred.reject();
      };

      vmsClient.refreshToken(successCallback, failureCallback);

      return deferred.promise;
    }
  }
})();
